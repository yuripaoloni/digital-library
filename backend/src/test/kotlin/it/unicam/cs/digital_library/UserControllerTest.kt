package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.UserController
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER1
import it.unicam.cs.digital_library.repository.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@TestPropertySource(properties = [], locations = ["classpath:application-test.properties"])
class UserControllerTest(
    @Autowired private val controller: UserController,
    @Autowired private val userRepository: UserRepository,
    @Autowired bCryptPasswordEncoder: BCryptPasswordEncoder
) : BaseTest(userRepository, bCryptPasswordEncoder) {
    @Test
    @WithMockUser(USER1)
    fun searchUsersTest() {
        assert(userRepository.findAll().first().username.run(controller::searchUsers).isNotEmpty())
    }
}