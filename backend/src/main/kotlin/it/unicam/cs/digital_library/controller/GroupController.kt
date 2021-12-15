package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.Authorization
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.model.GroupCreation
import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import it.unicam.cs.digital_library.repository.GroupMemberRepository
import it.unicam.cs.digital_library.repository.GroupRepository
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import springfox.documentation.annotations.ApiIgnore
import java.security.Principal

@CrossOrigin("*")
@RestController
@Api(tags = ["Groups"])
class GroupController(
    @Autowired val userRepository: UserRepository,
    @Autowired val groupRepository: GroupRepository,
    @Autowired val groupMemberRepository: GroupMemberRepository,
) {
    @PostMapping("/group/create")
    @Authenticate
    @ApiOperation(
        value = "create a group",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun createGroup(groupCreation: GroupCreation, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!

        val users = groupCreation.emails.mapNotNull { userRepository.findByEmail(it) }

        if (users.size != groupCreation.emails.size) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Utenti non trovati")
        }

        val group = groupRepository.save(Group(0, user, groupCreation.name))

        val members = users.map { GroupMember(0, group, it) }

        try {
            groupMemberRepository.saveAll(members)
        } catch (e: Throwable) {
            groupRepository.delete(group)
        }

        // TODO verificare creatore non tra i membri
        // TODO ....
    }
}