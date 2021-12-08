package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Bookmark
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookmarkRepository : JpaRepository<Bookmark, Long> {
    fun findByIdAndUserId(id: Long, user_id: Int): Bookmark?
    fun findByBookIdAndPageAndUserId(book_id: Long, page: Int, user_id: Int): Bookmark?
    fun findAllByBookIdAndUserId(book_id: Long, user_id: Int): List<Bookmark>
}