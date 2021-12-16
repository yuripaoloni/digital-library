package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.User
import org.springframework.util.Base64Utils

class LoginResponse(
    val email: String,
    val username: String,
    val name: String,
    val surname: String,
    val picture: String
)

fun User.toLoginResponse(): LoginResponse {
    return LoginResponse(
        email,
        username,
        name,
        surname,
        Base64Utils.encodeToString(picture)
    )
}