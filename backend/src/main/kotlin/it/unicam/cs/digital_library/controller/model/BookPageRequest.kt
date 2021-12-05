package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book

data class BookPageRequest(val book: Book, val page: Int)
