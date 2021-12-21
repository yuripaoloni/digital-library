package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Note
import java.time.format.DateTimeFormatter

data class NoteCreation(val book: Book, val page: Int, val title: String, val description: String)
data class NoteEdit(val id: Long, val title: String, val description: String)

data class NoteResponse(val id: Long, val book: Book, val user: UserResponse, val page: Int, val title: String, val description: String, val timestamp: String)

fun Note.toNoteResponse(): NoteResponse {
    return NoteResponse(id, book, user.toUserResponse(), page, title, description, timestamp.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")))
}