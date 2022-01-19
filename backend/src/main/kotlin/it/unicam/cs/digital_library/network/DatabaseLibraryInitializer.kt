package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.repository.LibraryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class DatabaseLibraryInitializer(@Autowired val libraryRepository: LibraryRepository, @Autowired val libraryService: LibraryService) :
    ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        libraryService.getLibraries().forEach {
            val library = libraryRepository.findByIdOrNull(it.id)
            if (library == null || library != it) {
                libraryRepository.save(it)
            }
        }
    }
}