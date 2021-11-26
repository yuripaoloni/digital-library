package it.unicam.cs.digital_library.model

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
data class Note(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val page: Int,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val book: Book,
    val note: String
)