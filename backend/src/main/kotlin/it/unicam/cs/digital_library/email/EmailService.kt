package it.unicam.cs.digital_library.email

import it.unicam.cs.digital_library.email.model.client.Email
import it.unicam.cs.digital_library.email.model.server.SendEmailRequest
import it.unicam.cs.digital_library.utils.toJson
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.exchange

class EmailService {
    private val restTemplate: RestTemplate

    companion object {
        private val FROM = "noreply@digitallibrary.com"
    }

    init {
        restTemplate = RestTemplateBuilder()
            .rootUri("https://api.cloudmailin.com/api/v0.1/71df948c506dea73")
            .defaultHeader("Authorization", "Bearer bjT9hrxFhJiGoA4M5nxMGfqZ")
            .defaultHeader("Content-Type", "application/json")
            .build()
    }

    fun sendEmail(email: Email): Boolean {

        val request = SendEmailRequest(
            from = FROM,
            to = email.to,
            subject = email.subject,
            plain = email.plain,
            html = email.html
        ).toJson()

        val response = restTemplate.exchange<Any>(url = "/messages", method = HttpMethod.POST, requestEntity = object : HttpEntity<String>(request) {})

        return response.statusCode.is2xxSuccessful
    }
}