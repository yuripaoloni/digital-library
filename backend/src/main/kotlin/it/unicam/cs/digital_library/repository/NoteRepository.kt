package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Note
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface NoteRepository : JpaRepository<Note, Long> {
    fun findAllByBookIdAndPage(book_id: Long, page: Int): List<Note>
    fun findAllByBookId(book_id: Long): List<Note>
}