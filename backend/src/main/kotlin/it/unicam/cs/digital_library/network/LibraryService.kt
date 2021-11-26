package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Library
import it.unicam.cs.digital_library.network.bibliotecaunicam.BibliotecaUnicamService

class LibraryService {
    companion object {
        const val BIBLIOTECA_UNICAM_ID: Long = 0

        private fun getLibraryServices(): List<ILibraryService> = listOf(BibliotecaUnicamService())
    }

    fun getLibraries(): List<Library> = getLibraryServices().map { it.getLibrary() }

    fun searchBook(query: String, libraryIds: List<Long>?): List<List<Book>> {
        return (if (libraryIds == null) getLibraryServices().flatMap { it.search(query) }
        else getLibraryServices().filter {
            it.getLibrary().id in libraryIds
        }.flatMap {
            it.search(query)
        }).chunked(10)
    }

    private fun getLibraryService(book: Book): ILibraryService? {
        return getLibraryServices().find { it.getLibrary().id == book.library.id }
    }

    fun getCover(book: Book): String? {
        return getLibraryService(book)?.getCover(book)
    }

    fun getRandomBooks(): List<Book> {
        return getLibraryServices().flatMap {
            it.getRandomBooks()
        }.shuffled().take(10)
    }
}