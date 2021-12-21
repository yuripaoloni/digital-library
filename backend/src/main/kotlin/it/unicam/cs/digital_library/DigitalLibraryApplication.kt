package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.GroupMemberRepository
import it.unicam.cs.digital_library.repository.GroupRepository
import it.unicam.cs.digital_library.repository.GroupUtils
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


@SpringBootApplication
class DigitalLibraryApplication {
    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun libraryService(): LibraryService {
        return LibraryService()
    }

    @Bean
    fun groupUtils(groupRepository: GroupRepository, groupMemberRepository: GroupMemberRepository): GroupUtils {
        return GroupUtils(groupRepository, groupMemberRepository)
    }
}

fun main(args: Array<String>) {
    runApplication<DigitalLibraryApplication>(*args)
}