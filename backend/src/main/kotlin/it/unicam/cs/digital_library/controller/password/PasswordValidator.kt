package it.unicam.cs.digital_library.controller.password

import it.unicam.cs.digital_library.controller.errors.ErrorException
import org.springframework.http.HttpStatus

object PasswordValidator {
    fun validate(password: String) {
        if (password.length < 8)
            throw ErrorException(HttpStatus.BAD_REQUEST, "Password troppo corta (min 8 caratteri)")

        if (password.length > 20)
            throw ErrorException(HttpStatus.BAD_REQUEST, "Password troppo lunga (max 20 caratteri)")
    }
}