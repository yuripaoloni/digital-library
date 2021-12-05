package it.unicam.cs.digital_library.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import springfox.documentation.annotations.ApiIgnore
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("")
@ApiIgnore
class IndexController {

    @GetMapping("/")
    fun index(response: HttpServletResponse) {
        response.sendRedirect("/swagger-ui/")
    }
}