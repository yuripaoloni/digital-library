package it.unicam.cs.digital_library.model

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@Table(uniqueConstraints = [UniqueConstraint(columnNames = ["book_id", "user_id"])])
data class FavoriteBook(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val book: Book,
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    val user: User
)