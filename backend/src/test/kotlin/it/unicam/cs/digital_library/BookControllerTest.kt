package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.BookController
import it.unicam.cs.digital_library.controller.model.*
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER1
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER2
import it.unicam.cs.digital_library.init.Method
import it.unicam.cs.digital_library.init.withLogin
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import it.unicam.cs.digital_library.utils.fromJson
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@TestPropertySource(properties = [], locations = ["classpath:application-test.properties"])
class BookControllerTest(
    @Autowired private val mockMvc: MockMvc,
    @Autowired private val bookController: BookController,
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
    @WithMockUser(USER1)
    fun getBookPageTest() {
        val book = bookController.getRandomBooks().first().first()
        assert(bookController.getBookPage(BookPageRequest(book, 1)).isNotEmpty())
    }

    @Test
    fun bookmarkCreateTest() {
        val book = bookController.getRandomBooks().first().first()

        // bookmark add
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/bookmark/add",
            BookmarkCreation(book, 1, "Test")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<BookmarkResponse>()!!

        // error bookmark on same page
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/bookmark/add",
            BookmarkCreation(book, 1, "Test")
        ).andExpect {
            status { is4xxClientError() }
        }

    }

    private fun createBookmark(book: Book): BookmarkResponse {
        return mockMvc.withLogin(
            USER1,
            Method.POST,
            "/bookmark/add",
            BookmarkCreation(book, 1, "Test")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<BookmarkResponse>()!!
    }

    @Test
    fun bookmarkEditTest() {

        val book = bookController.getRandomBooks().first().first()

        val bookmarkResponse = createBookmark(book)

        // bookmark edit
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/bookmark/edit",
            BookmarkEdit(bookmarkResponse.id, "Test edit")
        ).andExpect {
            status { isOk() }
        }

    }

    @Test
    fun bookmarkAllTest() {

        val book = bookController.getRandomBooks().first().first()

        createBookmark(book)

        // bookmark all
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/bookmark/all",
            book
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<BookmarkResponse>>()!!.let { assert(it.isNotEmpty()) }

    }

    @Test
    fun bookmarkDeleteTest() {

        val book = bookController.getRandomBooks().first().first()

        val bookmarkResponse = createBookmark(book)

        // bookmark delete
        mockMvc.withLogin(
            USER1,
            Method.DELETE,
            "/bookmark/delete/${bookmarkResponse.id}"
        ).andExpect {
            status { isOk() }
        }
    }

    @Test
    fun savedBooksTest() {
        val book = bookController.getRandomBooks().first().first()

        // add to saved books
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/book/saved/add",
            book
        ).andExpect {
            status { isOk() }
        }

        // remove from saved books
        mockMvc.withLogin(
            USER2,
            Method.DELETE,
            "/book/saved/delete",
            book
        ).andExpect {
            status { isOk() }
        }
    }

    @Test
    fun createNoteTest() {
        createNotes()
    }

    private fun createNotes(): List<NoteResponse> {
        val book = bookController.getRandomBooks().first().first()

        return (1..10).map {
            mockMvc.withLogin(
                USER2,
                Method.POST,
                "/note/add",
                NoteCreation(book, it, "Note $it", "Note $it description")
            ).andExpect {
                status { isOk() }
            }.andReturn().response.contentAsString.fromJson<NoteResponse>()!!
        }
    }

    @Test
    fun editNoteTest() {

        val noteResponses = createNotes()

        // edit note
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/note/edit",
            NoteEdit(noteResponses.first().id, "Note 1", "Note 1 description updated")
        ).andExpect {
            status { isOk() }
        }

    }

    @Test
    fun deleteNoteTest() {

        val noteResponses = createNotes()

        // delete note
        mockMvc.withLogin(
            USER2,
            Method.DELETE,
            "/note/delete/${noteResponses.first().id}"
        ).andExpect {
            status { isOk() }
        }

        // delete note error
        mockMvc.withLogin(
            USER2,
            Method.DELETE,
            "/note/delete/${noteResponses.first().id}"
        ).andExpect {
            status { is4xxClientError() }
        }

    }

    @Test
    fun getNotesTest() {

        val noteResponses = createNotes()

        val book = noteResponses.first().book

        // get book notes on page
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/note/page",
            BookPageRequest(book, noteResponses.first().page)
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<NoteResponse>>()!!.let { assert(it.isNotEmpty()) }

        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/note/all",
            book
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<NoteResponse>>()!!.let { assert(it.isNotEmpty()) }
    }
}
