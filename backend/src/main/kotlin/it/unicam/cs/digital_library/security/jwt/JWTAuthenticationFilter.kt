package it.unicam.cs.digital_library.security.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm.HMAC512
import com.fasterxml.jackson.module.kotlin.MissingKotlinParameterException
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import it.unicam.cs.digital_library.security.jwt.JWTConstants.EXPIRATION_TIME
import it.unicam.cs.digital_library.security.jwt.JWTConstants.HEADER_STRING
import it.unicam.cs.digital_library.security.jwt.JWTConstants.SECRET
import it.unicam.cs.digital_library.security.jwt.JWTConstants.TOKEN_PREFIX
import it.unicam.cs.digital_library.security.model.Credentials
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(private val authManager: AuthenticationManager) : UsernamePasswordAuthenticationFilter() {

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        try {
            val userAuthentication = jacksonObjectMapper().readValue<Credentials>(request.inputStream)
            return authManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    userAuthentication.email,
                    userAuthentication.password,
                    emptyList()
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
        authResult: Authentication
    ) {
        val token: String = JWT.create()
            .withSubject((authResult.principal as User).username)
            .withExpiresAt(Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .sign(HMAC512(SECRET))
        response.addHeader("Access-Control-Expose-Headers", HEADER_STRING);
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token)
    }
}