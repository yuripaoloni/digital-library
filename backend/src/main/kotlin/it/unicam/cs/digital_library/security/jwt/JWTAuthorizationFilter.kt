package it.unicam.cs.digital_library.security.jwt

import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.jwt.JWTConstants.HEADER_STRING
import it.unicam.cs.digital_library.security.jwt.JWTConstants.SECRET
import it.unicam.cs.digital_library.security.jwt.JWTConstants.TOKEN_PREFIX
import it.unicam.cs.digital_library.utils.Token
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
                val user = Token.getToken(token.replace(TOKEN_PREFIX, ""), SECRET)?.subject
                return if (user != null && userRepository.findByEmail(user) != null) {
                    UsernamePasswordAuthenticationToken(user, null, listOf(SimpleGrantedAuthority("ROLE_USER")))
                } else null
            }
            return null
        }.getOrNull()
    }
}
