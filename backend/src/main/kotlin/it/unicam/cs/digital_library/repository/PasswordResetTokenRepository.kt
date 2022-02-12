package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.PasswordResetToken
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PasswordResetTokenRepository : JpaRepository<PasswordResetToken, Long> {
    fun findByUser_Id(user_id: Int): PasswordResetToken?
    fun findByToken(token: String): PasswordResetToken?
}