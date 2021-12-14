package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Bookmark

data class BookmarkCreation(val book: Book, val page: Int, val description: String)
data class BookmarkEdit(val id: Long, val description: String)


data class BookmarkResponse(val id: Long, val book: Book, val page: Int, val description: String)

fun Bookmark.toBookmarkResponse(): BookmarkResponse {
    return BookmarkResponse(id, book, page, description)
}