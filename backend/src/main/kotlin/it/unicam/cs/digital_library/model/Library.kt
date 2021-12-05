package it.unicam.cs.digital_library.model

import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Library(
    @Id
    val id: Long,
    val name: String,
    val url: String,
    val icon: String
)