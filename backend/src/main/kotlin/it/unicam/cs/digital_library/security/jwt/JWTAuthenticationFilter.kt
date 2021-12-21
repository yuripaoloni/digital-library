package it.unicam.cs.digital_library.security.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm.HMAC512
import com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import it.unicam.cs.digital_library.controller.model.toLoginResponse
import it.unicam.cs.digital_library.repository.FavoriteBookRepository
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.jwt.JWTConstants.EXPIRATION_TIME
import it.unicam.cs.digital_library.security.jwt.JWTConstants.HEADER_STRING
import it.unicam.cs.digital_library.security.jwt.JWTConstants.SECRET
import it.unicam.cs.digital_library.security.jwt.JWTConstants.TOKEN_PREFIX
import it.unicam.cs.digital_library.security.model.Credentials
import it.unicam.cs.digital_library.utils.toJson
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(
    private val authManager: AuthenticationManager,
    private val userRepository: UserRepository,
    private val favoriteBookRepository: FavoriteBookRepository,
) : UsernamePasswordAuthenticationFilter() {

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        try {
            val userAuthentication = jacksonObjectMapper().readValue<Credentials>(request.inputStream)
            return authManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    userAuthentication.email,
                    userAuthentication.password,
                    listOf(SimpleGrantedAuthority("ROLE_USER"))
                )
            )
        } catch (e: MissingKotlinParameterException) {
            throw AuthenticationServiceException("Errore dati incompleti")
        } catch (e: Throwable) {
            throw AuthenticationServiceException("Credenziali non valide")
        }
    }


    override fun successfulAuthentication(
        request: HttpServletRequest,
        response: HttpServletResponse,
        chain: FilterChain,
        authResult: Authentication,
    ) {
        val email = (authResult.principal as User).username
        val user = userRepository.findByEmail(email)!!
        val savedBooks = favoriteBookRepository.findAllByUser_Id(user.id).map { it.book }
        val token: String = JWT.create()
            .withSubject(email)
            .withExpiresAt(Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .sign(HMAC512(SECRET))
        response.addHeader("Access-Control-Expose-Headers", HEADER_STRING)
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token)
        response.contentType = "application/json"
        response.characterEncoding = "UTF-8"
        response.writer.print(user.toLoginResponse(savedBooks).toJson())
    }
}