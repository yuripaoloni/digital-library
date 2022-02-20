package it.unicam.cs.digital_library.init

import it.unicam.cs.digital_library.repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


abstract class BaseTest(userRepository: UserRepository, bCryptPasswordEncoder: BCryptPasswordEncoder) {
    init {
        DatabaseInitializer.init(
            userRepository,
            bCryptPasswordEncoder
        )
    }
}