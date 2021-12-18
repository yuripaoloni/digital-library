package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.Authorization
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.model.GroupCreation
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.GroupMemberRepository
import it.unicam.cs.digital_library.repository.GroupRepository
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
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
        value = "create a group", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun createGroup(groupCreation: GroupCreation, @ApiIgnore principal: Principal) {
        val creator = userRepository.findByEmail(principal.name)!!

        val users = mutableListOf<User>()
        val notFoundUsers = mutableListOf<String>()

        groupCreation.emails.forEach {
            val searchedUser = userRepository.findByEmail(it)
            if (searchedUser == null) {
                notFoundUsers += it
            } else {
                users += searchedUser
            }
        }

        if (notFoundUsers.isNotEmpty()) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Utenti non trovati $notFoundUsers")
        }

        if (creator in users) {
            throw ErrorException(
                HttpStatus.BAD_REQUEST,
                "Il creatore del gruppo non può essere tra i membri poiché già presente"
            )
        }

        val group = groupRepository.save(Group(0, creator, groupCreation.name))

        val members = users.map { GroupMember(0, group, it) }

        try {
            groupMemberRepository.saveAll(members)
        } catch (e: Throwable) {
            groupRepository.delete(group)
        }
    }

    @GetMapping("/group/created")
    @ApiOperation(value = "get groups created")
    fun getCreatedGroups(@ApiIgnore principal: Principal): List<GroupMember> {
        val creator = userRepository.findByEmail(principal.name)!!
        return groupRepository.findAllByCreator_Id(creator.id)
    }

/*
    @GetMapping("/group/joined")
    @ApiOperation(value = "get groups joined")
    fun getJoinedGroups(@ApiIgnore principal: Principal): List<GroupRespose> {
        return null
    }
*/


}