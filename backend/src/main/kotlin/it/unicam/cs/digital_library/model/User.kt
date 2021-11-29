package it.unicam.cs.digital_library.model

import javax.persistence.*

@Entity
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false, unique = true)
    val username: String,

    @Column(nullable = false)
    val name: String = "",

    @Column(nullable = false)
    val surname: String = "",

    @Column(nullable = false)
    var password: String
)