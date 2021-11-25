package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import it.unicam.cs.digital_library.model.Library
import it.unicam.cs.digital_library.network.LibraryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Api(tags = ["Libraries"])
class LibraryController {
    private val libraryService = LibraryService()

    @GetMapping("/library/list")
    @ApiOperation(value = "get libraries")
    fun getLibraries(): List<Library> {
        return libraryService.getLibraries()
    }
}