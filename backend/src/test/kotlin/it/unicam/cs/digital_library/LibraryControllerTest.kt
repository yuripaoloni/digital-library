package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.LibraryController
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
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
    @Autowired libraryService: LibraryService,
    @Autowired libraryRepository: LibraryRepository,
    @Autowired userRepository: UserRepository,
    @Autowired bookRepository: BookRepository,
    @Autowired bookmarkRepository: BookmarkRepository,
    @Autowired noteRepository: NoteRepository,
    @Autowired sharedNoteRepository: SharedNoteRepository,
    @Autowired groupRepository: GroupRepository,
    @Autowired groupMemberRepository: GroupMemberRepository,
    @Autowired favoriteBookRepository: FavoriteBookRepository,
    @Autowired bCryptPasswordEncoder: BCryptPasswordEncoder
) : BaseTest(
    libraryService,
    libraryRepository,
    userRepository,
    bookRepository,
    bookmarkRepository,
    noteRepository,
    sharedNoteRepository,
    groupRepository,
    groupMemberRepository,
    favoriteBookRepository,
    bCryptPasswordEncoder
) {

    @Test
    fun getLibrariesTest() {
        assert(controller.getLibraries().isNotEmpty())
    }
}
