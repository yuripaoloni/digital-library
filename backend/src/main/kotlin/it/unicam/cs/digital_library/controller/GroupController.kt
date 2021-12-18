package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.Authorization
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.model.GroupCreation
import it.unicam.cs.digital_library.controller.model.GroupResponse
import it.unicam.cs.digital_library.controller.model.toGroupResponse
import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.GroupMemberRepository
import it.unicam.cs.digital_library.repository.GroupRepository
import it.unicam.cs.digital_library.repository.UserRepository
import it.unicam.cs.digital_library.security.Authenticate
import it.unicam.cs.digital_library.security.jwt.JWTConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
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
            throw ErrorException(HttpStatus.BAD_REQUEST, "Utenti non trovati")
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
    @Authenticate
    @ApiOperation(value = "get groups created", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)])
    fun getCreatedGroups(@ApiIgnore principal: Principal): List<GroupResponse> {
        val creator = userRepository.findByEmail(principal.name)!!
        val groups = groupRepository.findAllByCreator_Id(creator.id)
        return groups.map { toGroupResponse(it, groupMemberRepository.findAllByGroup_Id(it.id)) }
    }

    @PostMapping("/group/created/{id}/add")
    @Authenticate
    @ApiOperation(
        value = "add member to the group",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun addMemberToGroup(
        @PathVariable id: Long,
        @RequestBody emails: List<String>,
        @ApiIgnore principal: Principal
    ): GroupResponse {
        val creator = userRepository.findByEmail(principal.name)!!
        val group =
            groupRepository.findByIdOrNull(id) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Gruppo non trovato")
        if (group.creator.id != creator.id) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Non sei il creatore del gruppo!")
        } else {
            val users = mutableListOf<User>()
            val notFoundUsers = mutableListOf<String>()

            emails.forEach {
                val searchedUser = userRepository.findByEmail(it)
                if (searchedUser == null) {
                    notFoundUsers += it
                } else {
                    users += searchedUser
                }
            }

            if (notFoundUsers.isNotEmpty()) {
                throw ErrorException(HttpStatus.BAD_REQUEST, "Utenti non trovati")
            }

            if (creator in users) {
                throw ErrorException(
                    HttpStatus.BAD_REQUEST,
                    "Il creatore del gruppo non può essere tra i membri poiché già presente"
                )
            }

            val alreadyMembers = groupMemberRepository.findAllByGroup_Id(group.id)

            val duplicateMembers = alreadyMembers.filter { it.member in users }

            if (duplicateMembers.isNotEmpty()) {
                throw ErrorException(
                    HttpStatus.BAD_REQUEST,
                    "Alcuni membri fanno già parte del gruppo"
                )
            }

            val members = users.map { GroupMember(0, group, it) }

            return toGroupResponse(group, groupMemberRepository.saveAll(members))
        }
    }

    @PostMapping("/group/created/{id}/remove")
    @Authenticate
    @ApiOperation(
        value = "remove member from group",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun removeMembersFromGroup(
        @PathVariable id: Long,
        @RequestBody emails: List<String>,
        @ApiIgnore principal: Principal
    ): GroupResponse {
        val creator = userRepository.findByEmail(principal.name)!!
        val group =
            groupRepository.findByIdOrNull(id) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Gruppo non trovato")
        if (group.creator.id != creator.id) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Non sei il creatore del gruppo!")
        } else {
            val users = mutableListOf<User>()
            val notFoundUsers = mutableListOf<String>()

            emails.forEach {
                val searchedUser = userRepository.findByEmail(it)
                if (searchedUser == null) {
                    notFoundUsers += it
                } else {
                    users += searchedUser
                }
            }

            if (notFoundUsers.isNotEmpty()) {
                throw ErrorException(HttpStatus.BAD_REQUEST, "Utenti non trovati")
            }

            if (creator in users) {
                throw ErrorException(
                    HttpStatus.BAD_REQUEST,
                    "Il creatore del gruppo non può essere tra i membri"
                )
            }

            val members = groupMemberRepository.findAllByGroup_Id(group.id)

            groupMemberRepository.deleteAll(members.filter { it.member in users })

            return toGroupResponse(group, groupMemberRepository.findAllByGroup_Id(group.id))
        }
    }

    @DeleteMapping("/group/created/{id}")
    @Authenticate
    @ApiOperation(value = "deletes the group", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)])
    fun deleteGroup(@PathVariable id: Long, @ApiIgnore principal: Principal) {
        val creator = userRepository.findByEmail(principal.name)!!
        val group =
            groupRepository.findByIdOrNull(id) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Gruppo non trovato")
        if (group.creator.id != creator.id) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Non sei il creatore del gruppo!")
        } else {
            groupRepository.delete(group)
        }
    }


    @GetMapping("/group/joined")
    @Authenticate
    @ApiOperation(value = "get groups joined", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)])
    fun getJoinedGroups(@ApiIgnore principal: Principal): List<GroupResponse> {
        val member = userRepository.findByEmail(principal.name)!!
        val groups = groupMemberRepository.findAllByMember_Id(member.id).map { it.group }
        return groups.map { toGroupResponse(it, groupMemberRepository.findAllByGroup_Id(it.id)) }
    }

    @DeleteMapping("/group/joined/{id}")
    @Authenticate
    @ApiOperation(value = "leaves the group", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)])
    fun leaveGroup(@PathVariable id: Long, @ApiIgnore principal: Principal) {
        val member = userRepository.findByEmail(principal.name)!!
        val membership = groupMemberRepository.findByGroup_IdAndMember_Id(id, member.id) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Non fai parte del gruppo!"
        )
        kotlin.runCatching {
            groupMemberRepository.delete(membership)
        }.getOrElse { throw ErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore") }
    }
}