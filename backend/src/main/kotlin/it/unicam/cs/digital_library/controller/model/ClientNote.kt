package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Note

data class ClientNote(val id: Long, val book: Book, val page: Int, val note: String)

fun Note.toClientNote(): ClientNote {
    return ClientNote(id, book, page, note)
}