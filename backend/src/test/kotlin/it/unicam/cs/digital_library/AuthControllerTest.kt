package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.errors.SIGNUP_EMAIL_EXISTS
import it.unicam.cs.digital_library.controller.errors.SIGNUP_USERNAME_EXISTS
import it.unicam.cs.digital_library.controller.model.SignupRequest
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER1
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER_PASSWORD
import it.unicam.cs.digital_library.init.Method
import it.unicam.cs.digital_library.init.withLogin
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import it.unicam.cs.digital_library.security.model.Credentials
import it.unicam.cs.digital_library.utils.toJson
import org.hamcrest.core.Is.`is`
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class AuthControllerTest(
    @Autowired private val mockMvc: MockMvc,
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
    fun signupTest() {
        mockMvc.post("/signup") {
            contentType = MediaType.APPLICATION_JSON
            content = SignupRequest("test20@gmail.com", "test20", "test20", "test20", USER_PASSWORD, null).toJson()
        }.andExpect {
            status { isOk() }
        }
        // email already present
        mockMvc.post("/signup") {
            contentType = MediaType.APPLICATION_JSON
            content = SignupRequest("test20@gmail.com", "test21", "test20", "test20", USER_PASSWORD, null).toJson()
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest() }
            status { reason(`is`(SIGNUP_EMAIL_EXISTS.reason)) }
        }
        // username already present
        mockMvc.post("/signup") {
            contentType = MediaType.APPLICATION_JSON
            content = SignupRequest("test21@gmail.com", "test20", "test20", "test20", USER_PASSWORD, null).toJson()
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest() }
            status { reason(`is`(SIGNUP_USERNAME_EXISTS.reason)) }
        }
        // password not meeting criteria
        mockMvc.post("/signup") {
            contentType = MediaType.APPLICATION_JSON
            content = SignupRequest("test21@gmail.com", "test20", "test20", "test20", "123", null).toJson()
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest() }
        }
        // wrong arguments
        mockMvc.post("/signup") {
            contentType = MediaType.APPLICATION_JSON
            content = "test"
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest() }
        }
    }

    @Test
    fun loginTest() {
        mockMvc.post("/login") {
            contentType = MediaType.APPLICATION_JSON
            content = Credentials(USER1, USER_PASSWORD).toJson()
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk() }
            header { exists("Authorization") }
        }
        // login wrong credentials
        mockMvc.post("/login") {
            contentType = MediaType.APPLICATION_JSON
            content = Credentials(USER1, "test").toJson()
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun deleteProfileTest() {
        mockMvc.withLogin("test20@gmail.com", Method.DELETE, "/account/delete").andExpect {
            status { isOk() }
        }
    }
}