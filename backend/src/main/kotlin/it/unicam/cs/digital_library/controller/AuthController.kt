package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.errors.SIGNUP_EMAIL_EXISTS
import it.unicam.cs.digital_library.controller.errors.SIGNUP_USERNAME_EXISTS
import it.unicam.cs.digital_library.controller.password.PasswordValidator
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import it.unicam.cs.digital_library.security.model.Credentials
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("")
@Api(tags = ["Auth"])
class AuthController(
    @Autowired val userRepository: UserRepository,
    @Autowired val passwordEncoder: BCryptPasswordEncoder
) {
    @PostMapping(JWTConstants.SIGN_UP_URL)
    @ApiOperation(value = "sign up to digital library")
    fun signup(@RequestBody user: User) {
        if (this.userRepository.findByEmail(user.email) != null) {
            throw SIGNUP_EMAIL_EXISTS
        }
        if (this.userRepository.findByUsername(user.username) != null) {
            throw SIGNUP_USERNAME_EXISTS
        }
        PasswordValidator.validate(user.password)
        try {
            user.password = passwordEncoder.encode(user.password)
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }
        try {
            userRepository.save(user)
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
}