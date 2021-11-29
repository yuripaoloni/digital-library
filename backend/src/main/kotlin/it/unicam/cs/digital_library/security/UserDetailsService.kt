package it.unicam.cs.digital_library.security

import it.unicam.cs.digital_library.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByEmail(username) ?: throw RuntimeException()
        return org.springframework.security.core.userdetails.User(user.email, user.password, emptyList())
    }
}