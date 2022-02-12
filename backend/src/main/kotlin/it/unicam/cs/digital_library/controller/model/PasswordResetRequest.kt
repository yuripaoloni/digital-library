package it.unicam.cs.digital_library.controller.model

data class PasswordResetRequest(val token: String, val password: String)