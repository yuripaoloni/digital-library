package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.FavoriteBook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FavoriteBookRepository : JpaRepository<FavoriteBook, Long> {
    fun findAllByUser_Id(user_id: Int): List<FavoriteBook>
    fun findByBook_IdAndUser_Id(book_id: Long, user_id: Int): FavoriteBook?
}