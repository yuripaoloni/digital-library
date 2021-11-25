package it.unicam.cs.digital_library.model

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
data class Book(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val title: String,
    val author: String,
    val pages: Int,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val library: Library,
    val remoteId: Long,
    // optional
    val language: String?,
    val year: Int?,
    val genre: String?,
    val plot: String?
)