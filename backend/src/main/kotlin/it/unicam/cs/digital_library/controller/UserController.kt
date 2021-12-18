package it.unicam.cs.digital_library.controller

import io.swagger.annotations.*
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("*")
@RestController
@Api(tags = ["Users"])
class UserController(@Autowired val userRepository: UserRepository) {

    @GetMapping("/user/search")
    @ApiOperation(value = "get users",
        notes = "fetches users with username or email or name or surname starting by query",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @ApiResponses(
        value = [
            ApiResponse(
                code = 200,
                message = "The corresponding users"
            ),
            ApiResponse(code = 403, message = "Forbidden")
        ]
    )
    @Authenticate
    fun searchUsers(@RequestParam query: String): List<User> {
        return userRepository.findAllByEmailStartsWithOrUsernameStartsWithOrNameStartsWithOrSurnameStartsWithOrderByNameAsc(
            query,
            query,
            query,
            query)
    }
}