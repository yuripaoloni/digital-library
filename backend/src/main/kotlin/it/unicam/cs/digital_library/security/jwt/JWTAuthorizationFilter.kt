package it.unicam.cs.digital_library.security.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.jwt.JWTConstants.HEADER_STRING
import it.unicam.cs.digital_library.security.jwt.JWTConstants.SECRET
import it.unicam.cs.digital_library.security.jwt.JWTConstants.TOKEN_PREFIX
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthorizationFilter(authenticationManager: AuthenticationManager, private val userRepository: UserRepository) :
    BasicAuthenticationFilter(authenticationManager) {
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val header = request.getHeader(HEADER_STRING)

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }
        SecurityContextHolder.getContext().authentication = getAuthentication(request)
        chain.doFilter(request, response)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        return kotlin.runCatching {
            val token = request.getHeader(HEADER_STRING)
            if (token != null) {
                // parse the token.
                val user = JWT.require(Algorithm.HMAC512(SECRET))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .subject
                return if (user != null && userRepository.findByEmail(user) != null) {
                    UsernamePasswordAuthenticationToken(user, null, listOf(SimpleGrantedAuthority("ROLE_USER")))
                } else null
            }
            return null
        }.getOrNull()
    }
}
