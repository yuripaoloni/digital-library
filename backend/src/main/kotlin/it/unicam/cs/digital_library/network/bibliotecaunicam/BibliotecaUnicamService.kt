package it.unicam.cs.digital_library.network.bibliotecaunicam

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Library
import it.unicam.cs.digital_library.network.ILibraryService
import it.unicam.cs.digital_library.network.LibraryService.Companion.BIBLIOTECA_UNICAM_ID
import it.unicam.cs.digital_library.network.bibliotecaunicam.model.BookPage
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

    private fun getBooks(): List<Book> {
        return kotlin.runCatching {
            restTemplate.exchange(
                "/books",
                HttpMethod.GET,
                null,
                object : ParameterizedTypeReference<List<RemoteBook>>() {}).body?.map(this::toBook) ?: emptyList()
        }.getOrNull() ?: emptyList()
    }

    private fun getRemoteBookById(remoteBookId: Long): RemoteBook? {
        return kotlin.runCatching {
            restTemplate.exchange(
                "/books/$remoteBookId",
                HttpMethod.GET,
                null,
                object : ParameterizedTypeReference<RemoteBook>() {}).body
        }.getOrNull()
    }

    override fun search(query: String): List<Book> {
        return getBooks().filter {
            it.title.contains(query, ignoreCase = true)
        }
    }

    private fun toBook(remoteBook: RemoteBook): Book {
        return Book(
            title = remoteBook.title,
            author = remoteBook.creators,
            pages = remoteBook.pageNumber,
            remoteId = remoteBook.id,
            library = getLibrary(),
            genre = remoteBook.classification,
            year = remoteBook.date,
            plot = remoteBook.description,
            language = remoteBook.language
        )
    }

    override fun getCover(book: Book): String? {
        val remoteBook = getRemoteBookById(book.remoteId) ?: return null
        return getBookPages(remoteBook.id).find { it.isFrontCover }?.let {
            "https://bibliotecadigitale.unicam.it/Library/${remoteBook.bid.trim()}/${it.name.trim()}"
        }
    }

    override fun getRandomBooks(): List<Book> {
        return getBooks().shuffled().take(10)
    }

    private fun getBookPages(remoteBookId: Long): List<BookPage> {
        return kotlin.runCatching {
            restTemplate.exchange(
                "/bookpages/$remoteBookId",
                HttpMethod.GET,
                null,
                object : ParameterizedTypeReference<List<BookPage>>() {}).body
        }.getOrDefault(emptyList())!!
    }

    override fun getBookPage(book: Book, page: Int): String? {
        val remoteBook = getRemoteBookById(book.remoteId) ?: return null
        val bookPage = getBookPages(remoteBook.id).find { it.number == page }
        return bookPage?.let {
            "https://bibliotecadigitale.unicam.it/Library/${remoteBook.bid.trim()}/${it.name.trim()}"
        }
    }

    override fun getBook(book: Book): Book? {
        return getRemoteBookById(book.remoteId)?.run(this::toBook)
    }
}