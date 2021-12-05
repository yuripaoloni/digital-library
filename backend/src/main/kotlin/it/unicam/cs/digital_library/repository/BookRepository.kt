package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Book
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : JpaRepository<Book, Int> {
    fun findBookByRemoteIdAndLibraryId(remoteId: Long, library_id: Long): Book?
}

fun BookRepository.findAndSave(book: Book): Book {
    return findBookByRemoteIdAndLibraryId(book.remoteId, book.library.id) ?: save(book)
}

fun BookRepository.find(book: Book): Book? {
    return findBookByRemoteIdAndLibraryId(book.remoteId, book.library.id)
}