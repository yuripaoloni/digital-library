package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.BookController
import it.unicam.cs.digital_library.controller.LibraryController
import it.unicam.cs.digital_library.model.Book
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BookControllerTest(@Autowired private val bookController: BookController) {

    @Test
    fun searchBookTest(){
        assert(bookController.searchBook("diritto").isNotEmpty())
    }

    @Test
    fun searchBookTest1(){
        assert(bookController.searchBook("diritto", listOf(-1)).isEmpty())
    }
}