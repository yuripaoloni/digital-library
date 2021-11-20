package it.unicam.cs.digital_library.network.bibliotecaunicam

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Library
import it.unicam.cs.digital_library.network.ILibraryService
import it.unicam.cs.digital_library.network.LibraryService.Companion.BIBLIOTECA_UNICAM_ID
import it.unicam.cs.digital_library.network.bibliotecaunicam.model.RemoteBook
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.web.client.RestTemplate

class BibliotecaUnicamService : ILibraryService {
    private val restTemplate: RestTemplate

    init {
        restTemplate = RestTemplateBuilder()
            .rootUri("https://mdd.unicam.it/api")
            .build()
    }

    override fun getLibrary(): Library {
        return Library(
            id = BIBLIOTECA_UNICAM_ID,
            name = "Biblioteca digitale unicam",
            url = "https://bibliotecadigitale.unicam.it",
            icon = "https://bibliotecadigitale.unicam.it/Images/Logo.ico"
        )
    }

    override fun getBooks(): List<Book> {
        return restTemplate.exchange(
            "/books",
            HttpMethod.GET,
            null,
            object : ParameterizedTypeReference<List<RemoteBook>>() {}).body?.map(this::toBook) ?: emptyList()
    }

    override fun search(query: String): List<Book> {
        return getBooks().filter {
            it.title.contains(query, ignoreCase = true)
        }
    }

    private fun toBook(book: RemoteBook): Book {
        return Book(
            title = book.title,
            author = book.creators,
            pages = book.pageNumber,
            remoteId = book.id,
            library = getLibrary(),
            genre = book.classification,
            year = book.date,
            plot = book.description,
            language = book.language
        )
    }
}