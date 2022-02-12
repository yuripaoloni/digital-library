package it.unicam.cs.digital_library.model

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
data class PasswordResetToken(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val user: User,
    val token: String
)