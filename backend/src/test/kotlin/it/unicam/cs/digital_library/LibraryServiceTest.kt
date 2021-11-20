package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.network.LibraryService
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class LibraryServiceTest {

    @Test
    fun getLibrariesTest() {
        val service = LibraryService()
        assert(service.getLibraries().isNotEmpty())
    }

    @Test
    fun searchBookTest() {
        val service = LibraryService()
        val query = "diritto"
        val library = service.getLibraries().first()
        val books = service.searchBook(query, listOf(library.id))
        val filteredBooks = books.filter {
            it.library.id == library.id
        }
        assert(filteredBooks.size == books.size)
    }
}