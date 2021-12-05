package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.network.LibraryService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@CrossOrigin("*")
@RestController
@Api(tags = ["Books"])
class BookController {
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

    data class GetBookPageRequest(val book: Book, val page: Int)

    @PostMapping("/book/page")
    @ApiOperation(value = "get book page", notes = "fetches the corresponding book page URL")
    @ApiResponses(
        value = [
            ApiResponse(
                code = 200,
                message = "Ex. https://bibliotecadigitale.unicam.it/Library/Dir.civ.IV-A-520/Dir.civ.IV-A-520_0005.JPG"
            ),
            ApiResponse(code = 404, message = "Errore pagina non trovata")
        ]
    )
    fun getBookPage(@RequestBody bookPageRequest: GetBookPageRequest): String {
        return libraryService.getBookPage(bookPageRequest.book, bookPageRequest.page)
            ?: throw ErrorException(HttpStatus.NOT_FOUND, "Errore pagina non trovata")
    }
}