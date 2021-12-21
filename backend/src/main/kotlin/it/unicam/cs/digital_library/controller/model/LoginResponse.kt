package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.User
import org.springframework.util.Base64Utils

class LoginResponse(
    val email: String,
    val username: String,
    val name: String,
    val surname: String,
    val picture: String?,
    val savedBooks: List<Book>
)

fun User.toLoginResponse(savedBooks: List<Book>): LoginResponse {
    return LoginResponse(
        email,
        username,
        name,
        surname,
        picture?.let { Base64Utils.encodeToString(it) },
        savedBooks
    )
}
