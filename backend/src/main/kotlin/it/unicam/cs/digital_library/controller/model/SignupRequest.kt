package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.User

data class SignupRequest(val email: String, val username: String, val name: String, val surname: String, var password: String)

fun SignupRequest.toUser(): User {
    return User(0, email, username, name, surname, password)
}