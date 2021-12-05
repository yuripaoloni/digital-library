package it.unicam.cs.digital_library.controller.errors

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException


open class ErrorException(status: HttpStatus, reason: String?) : ResponseStatusException(status, reason)

object GENERIC_ERROR : ErrorException(HttpStatus.BAD_REQUEST, "Errore")

object SIGNUP_USERNAME_EXISTS : ErrorException(HttpStatus.BAD_REQUEST, "Username già presente")
object SIGNUP_EMAIL_EXISTS : ErrorException(HttpStatus.BAD_REQUEST, "Email già presente")