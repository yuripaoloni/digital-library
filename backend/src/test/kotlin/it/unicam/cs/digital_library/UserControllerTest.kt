package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.UserController
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER1
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class UserControllerTest(
    @Autowired private val controller: UserController,
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
    @WithMockUser(USER1)
    fun searchUsersTest() {
        assert(userRepository.findAll().first().username.run(controller::searchUsers).isNotEmpty())
    }
}