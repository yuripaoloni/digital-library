package it.unicam.cs.digital_library.init

import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


abstract class BaseTest(
    protected val libraryService: LibraryService,
    protected val libraryRepository: LibraryRepository,
    protected val userRepository: UserRepository,
    protected val bookRepository: BookRepository,
    protected val bookmarkRepository: BookmarkRepository,
    protected val noteRepository: NoteRepository,
    protected val sharedNoteRepository: SharedNoteRepository,
    protected val groupRepository: GroupRepository,
    protected val groupMemberRepository: GroupMemberRepository,
    protected val favoriteBookRepository: FavoriteBookRepository,
    protected val bCryptPasswordEncoder: BCryptPasswordEncoder
) {
    init {
        DatabaseInitializer.init(
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
        )
    }
}