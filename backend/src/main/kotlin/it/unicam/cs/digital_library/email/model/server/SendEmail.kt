package it.unicam.cs.digital_library.email.model.server

import com.fasterxml.jackson.annotation.JsonProperty

data class SendEmailRequest(
    val from: String,
    val to: String,
    @JsonProperty("test_mode") val testMode: Boolean = false,
    val subject: String,
    val plain: String? = null,
    val html: String? = null
)