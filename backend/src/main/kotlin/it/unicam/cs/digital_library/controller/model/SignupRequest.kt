package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.User
import org.springframework.util.Base64Utils

data class SignupRequest(val email: String, val username: String, val name: String, val surname: String, var password: String, val picture: String?)

fun SignupRequest.toUser(): User {
    return User(0, email, username, name, surname, password, picture?.let { Base64Utils.decodeFromString(it) })
}