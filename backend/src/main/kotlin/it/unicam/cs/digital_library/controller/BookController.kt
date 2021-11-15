package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.network.LibraryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@Api(tags = ["Books"])
class BookController {
    private val libraryService = LibraryService()

    @GetMapping("/book/search")
    @ApiOperation(value = "search book", notes = "search book by title and optionally by library ids")
    fun searchBook(@RequestParam query: String, @RequestParam libraryIds: List<Long>?): List<Book> {
        return libraryService.searchBook(query, libraryIds)
    }
}