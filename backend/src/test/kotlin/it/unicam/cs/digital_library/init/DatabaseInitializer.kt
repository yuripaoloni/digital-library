package it.unicam.cs.digital_library.init

import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

object DatabaseInitializer {

    private var isInitialized = false

    const val USER_PASSWORD = "12345678"
    const val USER1 = "user1@gmail.com"
    const val USER2 = "user2@gmail.com"
    const val USER3 = "user3@gmail.com"
    const val USER4 = "user4@gmail.com"
    const val USER5 = "user5@gmail.com"

    fun init(
        libraryService: LibraryService,
        libraryRepository: LibraryRepository,
        userRepository: UserRepository,
        bookRepository: BookRepository,
        bookmarkRepository: BookmarkRepository,
        noteRepository: NoteRepository,
        sharedNoteRepository: SharedNoteRepository,
        groupRepository: GroupRepository,
        groupMemberRepository: GroupMemberRepository,
        favoriteBookRepository: FavoriteBookRepository,
        bCryptPasswordEncoder: BCryptPasswordEncoder
    ) {
        if (!isInitialized) {
            initUsers(userRepository, bCryptPasswordEncoder)
            isInitialized = true
        }
    }

    private fun initUsers(userRepository: UserRepository, bCryptPasswordEncoder: BCryptPasswordEncoder) {
        (1..10).map {
            User(
                0,
                "user$it@gmail.com",
                "user$it",
                "User $it",
                "User $it",
                bCryptPasswordEncoder.encode(USER_PASSWORD),
                null
            )
        }.run(userRepository::saveAll)
    }
}