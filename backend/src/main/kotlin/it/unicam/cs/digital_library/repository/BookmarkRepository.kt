package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Bookmark
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookmarkRepository : JpaRepository<Bookmark, Long> {
    fun findByBookIdAndPage(book_id: Long, page: Int): Bookmark?
    fun findAllByBookId(book_id: Long): List<Bookmark>
}