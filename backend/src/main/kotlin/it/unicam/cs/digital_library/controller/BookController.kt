package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.model.*
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Bookmark
import it.unicam.cs.digital_library.model.Note
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import springfox.documentation.annotations.ApiIgnore
import java.security.Principal

@CrossOrigin("*")
@RestController
@Api(tags = ["Books"])
class BookController(
    @Autowired val userRepository: UserRepository,
    @Autowired val noteRepository: NoteRepository,
    @Autowired val bookmarkRepository: BookmarkRepository,
    @Autowired val bookRepository: BookRepository
) {
    private val libraryService = LibraryService()

    @GetMapping("/book/search")
    @ApiOperation(value = "search book", notes = "search book by title and optionally by library ids")
    fun searchBook(
        @RequestParam query: String,
        @RequestParam(required = false) @ApiParam(required = false) libraryIds: List<Long>? = null
    ): List<List<Book>> {
        return libraryService.searchBook(query, libraryIds)
    }

    @PostMapping("/book/cover")
    @ApiOperation(value = "get book cover", notes = "fetches the book url cover, if present")
    fun getCover(@RequestBody book: Book): String? {
        return libraryService.getCover(book)
    }

    @GetMapping("/book/random")
    @ApiOperation(value = "get random books", notes = "fetches 10 random books from libraries")
    fun getRandomBooks(): List<List<Book>> {
        return libraryService.getRandomBooks()
    }

    @PostMapping("/book/page")
    @ApiOperation(
        value = "get book page",
        notes = "fetches the corresponding book page URL",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @ApiResponses(
        value = [
            ApiResponse(
                code = 200,
                message = "Ex. https://bibliotecadigitale.unicam.it/Library/Dir.civ.IV-A-520/Dir.civ.IV-A-520_0005.JPG"
            ),
            ApiResponse(code = 404, message = "Errore pagina non trovata"),
            ApiResponse(code = 403, message = "Forbidden")
        ]
    )
    @Authenticate
    fun getBookPage(@RequestBody bookPageRequest: BookPageRequest): String {
        return libraryService.getBookPage(bookPageRequest.book, bookPageRequest.page)
            ?: throw ErrorException(HttpStatus.NOT_FOUND, "Errore pagina non trovata")
    }

    @PostMapping("/note/add")
    @ApiOperation(
        value = "create a note",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun addNote(@RequestBody noteCreation: NoteCreation, @ApiIgnore principal: Principal): NoteResponse {
        val user = userRepository.findByEmail(principal.name)!!
        val book = (libraryService.parseBook(noteCreation.book) ?: throw GENERIC_ERROR).run(bookRepository::findAndSave)
        return noteRepository.save(Note(0, book, user, noteCreation.page, noteCreation.title, noteCreation.description))
            .toNoteResponse()
    }

    @PostMapping("/note/edit")
    @ApiOperation(
        value = "edits a note",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun editNote(@RequestBody noteEdit: NoteEdit, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        noteRepository.save(
            (noteRepository.findByIdAndUserId(noteEdit.id, user.id) ?: throw ErrorException(
                HttpStatus.BAD_REQUEST,
                "Nota non trovata"
            )).run {
                val note = copy(title = noteEdit.title, description = noteEdit.description)
                note.timestamp = timestamp
                note
            }
        )
    }

    @DeleteMapping("/note/delete/{id}")
    @ApiOperation(
        value = "deletes a note",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun deleteNote(@PathVariable id: Long, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        noteRepository.delete(
            (noteRepository.findByIdAndUserId(id, user.id) ?: throw ErrorException(
                HttpStatus.BAD_REQUEST,
                "Nota non trovata"
            ))
        )
    }

    @PostMapping("/note/page")
    @ApiOperation(
        value = "get notes for a given page",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun getNotesByPage(
        @RequestBody bookPageRequest: BookPageRequest,
        @ApiIgnore principal: Principal
    ): List<NoteResponse> {
        val user = userRepository.findByEmail(principal.name)!!
        val book = (libraryService.parseBook(bookPageRequest.book) ?: return emptyList()).run(bookRepository::find)
            ?: return emptyList()
        return noteRepository.findAllByBookIdAndPageAndUserId(book.id, bookPageRequest.page, user.id)
            .map(Note::toNoteResponse)
    }

    @PostMapping("/note/all")
    @ApiOperation(
        value = "get all notes for a given book",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun getNotesByBook(
        @RequestBody book: Book,
        @ApiIgnore principal: Principal
    ): List<NoteResponse> {
        val user = userRepository.findByEmail(principal.name)!!
        return noteRepository.findAllByBookIdAndUserId(
            ((libraryService.parseBook(book) ?: return emptyList()).run(bookRepository::find)
                ?: return emptyList()).id,
            user.id
        ).map(Note::toNoteResponse)
    }

    @PostMapping("/bookmark/add")
    @ApiOperation(
        value = "create a bookmark",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun addBookmark(@RequestBody bookmarkCreation: BookmarkCreation, @ApiIgnore principal: Principal): BookmarkResponse {
        val user = userRepository.findByEmail(principal.name)!!
        val book =
            (libraryService.parseBook(bookmarkCreation.book) ?: throw GENERIC_ERROR).run(bookRepository::findAndSave)
        val bookmark = bookmarkRepository.findByBookIdAndPageAndUserId(book.id, bookmarkCreation.page, user.id)
        if (bookmark != null) throw ErrorException(HttpStatus.FORBIDDEN, "Bookmark già presente sulla pagina")
        else return bookmarkRepository.save(Bookmark(0, book, user, bookmarkCreation.page, bookmarkCreation.description))
            .toBookmarkResponse()
    }

    @PostMapping("/bookmark/edit")
    @ApiOperation(
        value = "edits a bookmark",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun editBookmark(@RequestBody bookmarkEdit: BookmarkEdit, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        bookmarkRepository.save(
            (bookmarkRepository.findByIdAndUserId(bookmarkEdit.id, user.id)
                ?: throw ErrorException(
                    HttpStatus.BAD_REQUEST,
                    "Bookmark non trovato"
                )).copy(description = bookmarkEdit.description)
        )
    }

    @DeleteMapping("/bookmark/delete/{id}")
    @ApiOperation(
        value = "deletes a bookmark",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun deleteBookmark(@PathVariable id: Long, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        bookmarkRepository.delete(
            (bookmarkRepository.findByIdAndUserId(id, user.id) ?: throw ErrorException(
                HttpStatus.BAD_REQUEST,
                "Bookmark non trovato"
            ))
        )
    }

    @PostMapping("/bookmark/all")
    @ApiOperation(
        value = "get all bookmarks for a given book",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun getBookmarksByBook(
        @RequestBody book: Book,
        @ApiIgnore principal: Principal
    ): List<BookmarkResponse> {
        val user = userRepository.findByEmail(principal.name)!!
        return bookmarkRepository.findAllByBookIdAndUserId(
            book_id = ((libraryService.parseBook(book) ?: return emptyList()).run(bookRepository::find)
                ?: return emptyList()).id,
            user_id = user.id
        ).map(Bookmark::toBookmarkResponse)
    }
}