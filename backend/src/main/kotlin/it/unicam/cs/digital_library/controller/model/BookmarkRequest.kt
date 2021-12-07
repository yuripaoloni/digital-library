package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Bookmark

data class BookmarkRequest(val id: Long, val book: Book, val page: Int, val description: String)

fun Bookmark.toBookmarkRequest(): BookmarkRequest {
    return BookmarkRequest(id, book, page, description)
}