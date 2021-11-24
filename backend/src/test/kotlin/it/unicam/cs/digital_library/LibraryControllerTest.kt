package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.LibraryController
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class LibraryControllerTest(@Autowired private val controller: LibraryController) {

    @Test
    fun getLibrariesTest(){
        assert(controller.getLibraries().isNotEmpty())
    }
}
