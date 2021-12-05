package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.network.LibraryService
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
}