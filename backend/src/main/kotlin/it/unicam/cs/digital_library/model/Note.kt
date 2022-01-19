package it.unicam.cs.digital_library.model

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Note(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val book: Book,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val user: User,
    val page: Int,
    val title: String,
    val description: String
) {
    @CreationTimestamp
    @Column(updatable = false)
    lateinit var timestamp: LocalDateTime
}