package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.errors.SIGNUP_EMAIL_EXISTS
import it.unicam.cs.digital_library.controller.errors.SIGNUP_USERNAME_EXISTS
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
@Api(tags = ["User"])
class UserController(
    @Autowired val userRepository: UserRepository,
    @Autowired val passwordEncoder: BCryptPasswordEncoder
) {
    @PostMapping("/signup")
    @ApiOperation(value = "sign up to digital library")
    fun signup(@RequestBody user: User) {
        try {
            user.password = passwordEncoder.encode(user.password)
            if (this.userRepository.findByEmail(user.email) != null) {
                throw SIGNUP_EMAIL_EXISTS
            }
            if (this.userRepository.findByUsername(user.username) != null) {
                throw SIGNUP_USERNAME_EXISTS
            }
            userRepository.save(user)
        } catch (e: IllegalArgumentException) {
            throw GENERIC_ERROR
        }
    }
}