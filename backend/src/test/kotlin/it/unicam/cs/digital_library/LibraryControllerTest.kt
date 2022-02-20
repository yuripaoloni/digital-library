package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.LibraryController
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.repository.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@TestPropertySource(properties = [], locations = ["classpath:application-test.properties"])
class LibraryControllerTest(
    @Autowired private val controller: LibraryController,
    @Autowired userRepository: UserRepository,
    @Autowired bCryptPasswordEncoder: BCryptPasswordEncoder
) : BaseTest(userRepository, bCryptPasswordEncoder) {

    @Test
    fun getLibrariesTest() {
        assert(controller.getLibraries().isNotEmpty())
    }
}
