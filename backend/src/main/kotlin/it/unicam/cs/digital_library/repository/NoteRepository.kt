package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Note
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NoteRepository : JpaRepository<Note, Long> {
    fun findByIdAndUserId(id: Long, user_id: Int): Note?
    fun findAllByBookIdAndPageAndUserId(book_id: Long, page: Int, user_id: Int): List<Note>
    fun findAllByBookIdAndUserId(book_id: Long, user_id: Int): List<Note>
}