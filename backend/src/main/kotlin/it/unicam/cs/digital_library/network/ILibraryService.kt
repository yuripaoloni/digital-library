package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Library

interface ILibraryService {
    fun getLibrary(): Library
    fun search(query: String): List<Book>
    fun getCover(book: Book): String?
    fun getRandomBooks(): List<Book>
    fun getBookPage(book: Book, page: Int): String?
}