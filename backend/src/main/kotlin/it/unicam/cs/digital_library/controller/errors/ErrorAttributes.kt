package it.unicam.cs.digital_library.controller.errors

import org.springframework.boot.web.error.ErrorAttributeOptions
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes
import org.springframework.stereotype.Component
import org.springframework.web.context.request.WebRequest

@Component
class ErrorAttributes : DefaultErrorAttributes() {
    override fun getErrorAttributes(webRequest: WebRequest?, options: ErrorAttributeOptions?): MutableMap<String, Any> {
        return super.getErrorAttributes(webRequest, options).apply {
            remove("timestamp")
            remove("status")
            remove("error")
            remove("path")
            remove("trace")
        }
    }
}