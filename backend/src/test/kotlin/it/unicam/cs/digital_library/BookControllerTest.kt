package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.BookController
import it.unicam.cs.digital_library.model.Note
import it.unicam.cs.digital_library.repository.LibraryRepository
import it.unicam.cs.digital_library.repository.NoteRepository
import it.unicam.cs.digital_library.repository.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BookControllerTest(
    @Autowired private val bookController: BookController,
    @Autowired private val userRepository: UserRepository,
    @Autowired private val noteRepository: NoteRepository,
    @Autowired private val libraryRepository: LibraryRepository
) {

    @Test
    fun searchBookTest() {
        assert(bookController.searchBook("diritto").isNotEmpty())
        assert(bookController.searchBook("diritto", listOf(-1)).isEmpty())
    }

    @Test
    fun getCoverTest() {
        val books = bookController.searchBook("Diritto delle obbligazioni - Lezioni di diritto civile")
        assert(books.isNotEmpty())
        val book = books.getOrNull(0)?.getOrNull(0)
        require(book != null)
        assert(bookController.getCover(book) != null)
    }

    @Test
    fun getRandomBooksTest() {
        val randomBooks = bookController.getRandomBooks()
        assert(randomBooks.isNotEmpty())
        assert(randomBooks.first().size <= 10)
    }

    @Test
    fun addNote() {
        val book = bookController.getRandomBooks().first().first()
        val user = userRepository.findByEmail("test@gmail.com")!!
        val note = Note(0, book, user, 0, "Prova")
        noteRepository.save(note)
    }
}