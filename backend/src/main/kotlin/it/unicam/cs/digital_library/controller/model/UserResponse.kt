package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.User
import org.springframework.util.Base64Utils

class UserResponse(
    val email: String,
    val username: String,
    val name: String,
    val surname: String,
    val picture: String?
)

fun User.toUserResponse(): UserResponse {
    return UserResponse(
        email,
        username,
        name,
        surname,
        picture?.let { Base64Utils.encodeToString(it) }
    )
}