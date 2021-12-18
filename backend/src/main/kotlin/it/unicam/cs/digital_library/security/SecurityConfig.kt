package it.unicam.cs.digital_library.security

import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.jwt.JWTAuthenticationFilter
import it.unicam.cs.digital_library.security.jwt.JWTAuthorizationFilter
import it.unicam.cs.digital_library.security.jwt.JWTConstants.LOGIN_URL
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class WebSecurity(
    val userDetailsService: UserDetailsServiceImpl,
    val passwordEncoder: BCryptPasswordEncoder,
    val userRepository: UserRepository
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http.cors()
            .and()
            .csrf()
            .disable()
            .authorizeRequests()
            .anyRequest()
            .permitAll()
            .and()
            .addFilter(JWTAuthenticationFilter(authenticationManager(), userRepository).apply {
                setFilterProcessesUrl(LOGIN_URL)
                this.setAuthenticationFailureHandler { _, response, exception ->
                    response.sendError(HttpStatus.BAD_REQUEST.value(), exception.message)
                }
            })
            .addFilter(JWTAuthorizationFilter(authenticationManager(), userRepository))
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", CorsConfiguration().applyPermitDefaultValues().apply {
            this.addAllowedMethod(HttpMethod.DELETE)
            this.addAllowedMethod(HttpMethod.PUT)
        })
        return source
    }
}