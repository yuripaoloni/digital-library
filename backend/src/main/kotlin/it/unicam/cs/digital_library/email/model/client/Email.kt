package it.unicam.cs.digital_library.email.model.client

data class Email(val to: String, val subject: String, val html: String? = null, val plain: String? = null)