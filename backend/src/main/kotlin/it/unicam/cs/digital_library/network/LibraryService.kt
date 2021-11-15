package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.model.Book

class LibraryService {
    private val libraryManager = LibraryManager

    fun getLibraries() = libraryManager.getLibraries()

    fun searchBook(query: String, libraryIds: List<Long>?): List<Book> {
        return if (libraryIds == null) libraryManager.getLibraryServices().flatMap { it.search(query) }
        else libraryManager.getLibraryServices().filter {
            it.getLibrary().id in libraryIds
        }.flatMap {
            it.search(query)
        }
    }
}