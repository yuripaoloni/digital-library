package it.unicam.cs.digital_library.init

import it.unicam.cs.digital_library.security.model.Credentials
import it.unicam.cs.digital_library.utils.toJson
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.*
import org.springframework.test.web.servlet.delete

enum class Method {
    POST, GET, DELETE
}

fun MockMvc.withLogin(email: String, method: Method, url: String, data: Any? = null): ResultActionsDsl {
    val token = post("/login") {
        contentType = MediaType.APPLICATION_JSON
        content = Credentials(email, DatabaseInitializer.USER_PASSWORD).toJson()
        accept = MediaType.APPLICATION_JSON
    }.andExpect {
        status { isOk() }
        header { exists("Authorization") }
    }.andReturn().response.getHeader("Authorization")!!

    val function: ((String, Any?, (MockHttpServletRequestDsl.() -> Unit)) -> ResultActionsDsl) = when (method) {
        Method.POST -> ::post
        Method.GET -> ::get
        Method.DELETE -> ::delete
    }

    return function(url, null) {
        contentType = MediaType.APPLICATION_JSON
        header("Authorization", token)
        content = data?.toJson()
        accept = MediaType.APPLICATION_JSON
    }
}