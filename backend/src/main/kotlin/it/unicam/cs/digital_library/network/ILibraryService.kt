package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Library

interface ILibraryService {
    fun getLibrary(): Library
    fun getBooks(): List<Book>
    fun search(query: String): List<Book>
}