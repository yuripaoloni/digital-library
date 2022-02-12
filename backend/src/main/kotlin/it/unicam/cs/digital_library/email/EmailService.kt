package it.unicam.cs.digital_library.email

import it.unicam.cs.digital_library.email.model.client.Email
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.exchange

class EmailService {
    private val restTemplate: RestTemplate

    companion object {
        private val FROM = "Digial Library <noreply@digitallibrary.com>"
    }

    init {
        restTemplate = RestTemplateBuilder()
            .rootUri("https://api.mailgun.net/v3/sandboxb3c8d74ea29d45019c228b708c3a1409.mailgun.org")
            .defaultHeader("Authorization", "Basic YXBpOjE2ZGUwYWU3MDhkYWI1ZDYyMzk4Mjc5NzhmYTU0NWY0LWQyY2M0OGJjLTg3Mjc2MDhl")
            .build()
    }

    fun sendEmail(email: Email): Boolean {
        val response =
            restTemplate.exchange<Any>(url = "/messages", method = HttpMethod.POST, requestEntity = object : HttpEntity<MultiValueMap<String, String>>(LinkedMultiValueMap<String, String>().apply {
                add("from", FROM)
                add("to", email.to)
                add("subject", email.subject)
                add("html", email.html)
            }, HttpHeaders().apply {
                contentType = MediaType.APPLICATION_FORM_URLENCODED
            }) {})

        return response.statusCode.is2xxSuccessful
    }
}