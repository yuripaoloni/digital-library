package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.User

class LoginResponse(val email: String, val username: String, val name: String, val surname: String)

fun User.toLoginResponse(): LoginResponse {
    return LoginResponse(email, username, name, surname)
}