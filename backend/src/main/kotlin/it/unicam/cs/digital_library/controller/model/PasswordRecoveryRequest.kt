package it.unicam.cs.digital_library.controller.model

data class PasswordRecoveryRequest(val email: String, val redirect: String)