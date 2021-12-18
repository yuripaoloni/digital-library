package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Int> {
    fun findByEmail(email: String): User?
    fun findByUsername(email: String): User?
    fun findAllByEmailStartsWithOrUsernameStartsWithOrNameStartsWithOrSurnameStartsWithOrderByNameAsc(
        email: String,
        username: String,
        name: String,
        surname: String,
    ): List<User>
}