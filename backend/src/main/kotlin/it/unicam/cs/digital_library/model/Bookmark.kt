package it.unicam.cs.digital_library.model

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["book_id", "page"])])
data class Bookmark(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "book_id")
    val book: Book,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val user: User,
    val page: Int,
    val description: String
)