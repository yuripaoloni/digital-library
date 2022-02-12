package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.errors.SIGNUP_EMAIL_EXISTS
import it.unicam.cs.digital_library.controller.errors.SIGNUP_USERNAME_EXISTS
import it.unicam.cs.digital_library.controller.model.PasswordRecoveryRequest
import it.unicam.cs.digital_library.controller.model.PasswordResetRequest
import it.unicam.cs.digital_library.controller.model.SignupRequest
import it.unicam.cs.digital_library.controller.model.toUser
import it.unicam.cs.digital_library.controller.password.PasswordValidator
import it.unicam.cs.digital_library.email.EmailService
import it.unicam.cs.digital_library.email.model.client.Email
import it.unicam.cs.digital_library.model.PasswordResetToken
import it.unicam.cs.digital_library.repository.PasswordResetTokenRepository
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import it.unicam.cs.digital_library.security.model.Credentials
import it.unicam.cs.digital_library.utils.Token
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*
import org.thymeleaf.context.Context
import org.thymeleaf.spring5.SpringTemplateEngine
import springfox.documentation.annotations.ApiIgnore
import java.security.Principal

@RestController
@RequestMapping("")
@Api(tags = ["Auth"])
class AuthController(
    @Autowired val userRepository: UserRepository,
    @Autowired val passwordEncoder: BCryptPasswordEncoder,
    @Autowired val emailService: EmailService,
    @Autowired val passwordResetTokenRepository: PasswordResetTokenRepository,
    @Autowired val templateEngine: SpringTemplateEngine
) {
    @PostMapping(JWTConstants.SIGN_UP_URL)
    @ApiOperation(value = "sign up to digital library")
    fun signup(@RequestBody signupRequest: SignupRequest) {
        if (this.userRepository.findByEmail(signupRequest.email) != null) {
            throw SIGNUP_EMAIL_EXISTS
        }
        if (this.userRepository.findByUsername(signupRequest.username) != null) {
            throw SIGNUP_USERNAME_EXISTS
        }
        PasswordValidator.validate(signupRequest.password)
        try {
            signupRequest.password = passwordEncoder.encode(signupRequest.password)
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }
        try {
            userRepository.save(signupRequest.toUser())
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }
    }

    @PostMapping(JWTConstants.LOGIN_URL)
    @ApiOperation(
        value = "sign in to digital library"
    )
    @ApiResponses(
        value = [
            ApiResponse(
                code = 200, message = "Returns the authorization token", responseHeaders = [ResponseHeader(
                    name = JWTConstants.HEADER_STRING,
                    description = "Authorization token",
                    response = String::class
                )]
            )
        ]
    )
    fun login(@RequestBody credentials: Credentials) {
        // fake to show docs
    }

    @DeleteMapping("/account/delete")
    @ApiOperation(
        value = "deletes the account",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun deleteProfile(@ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        try {
            userRepository.delete(user)
        } catch (e: Throwable) {
            throw ErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore")
        }
    }

    @PostMapping("/user/passwordRecovery")
    @ApiOperation(value = "sends the email containing the link to reset the password")
    fun requestPasswordRecovery(@RequestBody passwordRecoveryRequest: PasswordRecoveryRequest) {
        val user = userRepository.findByEmail(passwordRecoveryRequest.email) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Utente non trovato")

        var resetToken = passwordResetTokenRepository.findByUser_Id(user.id)

        if (resetToken != null) {
            passwordResetTokenRepository.delete(resetToken)
        }

        val token = Token.createToken(user.email, JWTConstants.SECRET_1, JWTConstants.EXPIRATION_TIME)

        resetToken = PasswordResetToken(0, user, token)

        passwordResetTokenRepository.save(resetToken)

        val url = "${passwordRecoveryRequest.redirect}?resetToken=$token"

        val context = Context()
        context.setVariable("url", url)

        val htmlTemplate: String = templateEngine.process("resetPassword", context).also {
            println(it)
        }

        if (!emailService.sendEmail(Email(to = user.email, subject = "Reset password", html = htmlTemplate))) {
            passwordResetTokenRepository.delete(resetToken)
            throw GENERIC_ERROR
        }
    }

    @PostMapping("/user/resetPassword")
    @ApiOperation(value = "resets the password with the new one provided")
    fun resetPassword(@RequestBody passwordResetRequest: PasswordResetRequest) {
        val resetToken = passwordResetTokenRepository.findByToken(passwordResetRequest.token) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Errore. Effettuare nuovamente la richiesta di reset."
        )

        if (Token.getToken(resetToken.token, JWTConstants.SECRET_1) == null) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Richiesta scaduta, effettuare nuovamente la richiesta di reset.")
        }

        val user = resetToken.user

        PasswordValidator.validate(passwordResetRequest.password)

        val newPassword: String

        try {
            newPassword = passwordEncoder.encode(passwordResetRequest.password)
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }

        userRepository.save(user.copy(password = newPassword))

        passwordResetTokenRepository.delete(resetToken)
    }
}