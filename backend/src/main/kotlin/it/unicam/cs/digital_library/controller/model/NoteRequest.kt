package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Note

data class NoteRequest(val id: Long, val book: Book, val page: Int, val note: String)

fun Note.toNoteRequest(): NoteRequest {
    return NoteRequest(id, book, page, note)
}