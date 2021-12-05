package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.model.BookPageRequest
import it.unicam.cs.digital_library.controller.model.ClientNote
import it.unicam.cs.digital_library.controller.model.toClientNote
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Note
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
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
    fun addNote(@RequestBody clientNote: ClientNote, @ApiIgnore principal: Principal): ClientNote {
        val user = userRepository.findByEmail(principal.name)!!
        val book = (libraryService.parseBook(clientNote.book) ?: throw GENERIC_ERROR).run(bookRepository::findAndSave)
        return noteRepository.save(Note(0, book, user, clientNote.page, clientNote.note)).toClientNote()
    }

    @PostMapping("/note/edit")
    @ApiOperation(
        value = "edits a note",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun editNote(@RequestBody clientNote: ClientNote, @ApiIgnore principal: Principal) {
        noteRepository.save(
            (noteRepository.findByIdOrNull(clientNote.id) ?: throw GENERIC_ERROR).copy(note = clientNote.note)
        )
    }

    @DeleteMapping("/note/delete")
    @ApiOperation(
        value = "deletes a note",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun deleteNote(@RequestBody clientNote: ClientNote, @ApiIgnore principal: Principal) {
        noteRepository.delete(
            (noteRepository.findByIdOrNull(clientNote.id) ?: throw GENERIC_ERROR)
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
    ): List<ClientNote> {
        val book = (libraryService.parseBook(bookPageRequest.book) ?: throw GENERIC_ERROR).run(bookRepository::find)
            ?: return emptyList()
        return noteRepository.findAllByBookIdAndPage(book.id, bookPageRequest.page).map(Note::toClientNote)
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
    ): List<ClientNote> {
        return noteRepository.findAllByBookId(
            ((libraryService.parseBook(book) ?: throw GENERIC_ERROR).run(bookRepository::find)
                ?: return emptyList()).id
        ).map(Note::toClientNote)
    }
}