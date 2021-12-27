package it.unicam.cs.digital_library.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.Authorization
import it.unicam.cs.digital_library.controller.errors.ErrorException
import it.unicam.cs.digital_library.controller.errors.GENERIC_ERROR
import it.unicam.cs.digital_library.controller.model.*
import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import it.unicam.cs.digital_library.model.SharedNote
import it.unicam.cs.digital_library.model.User
import it.unicam.cs.digital_library.repository.*
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
    @Autowired val sharedNoteRepository: SharedNoteRepository,
    @Autowired val noteRepository: NoteRepository,
    @Autowired val groupUtils: GroupUtils
) {
    @PostMapping("/group/create")
    @Authenticate
    @ApiOperation(
        value = "create a group", authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun createGroup(@RequestBody groupCreation: GroupCreation, @ApiIgnore principal: Principal): GroupResponse {
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
            val groupMembers = groupMemberRepository.saveAll(members)
            return toGroupResponse(group, groupMembers)
        } catch (e: Throwable) {
            groupRepository.delete(group)
            throw ErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore")
        }


    }

    @GetMapping("/group/created")
    @Authenticate
    @ApiOperation(
        value = "get groups created by the user",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun getCreatedGroups(@ApiIgnore principal: Principal): List<GroupResponse> {
        val creator = userRepository.findByEmail(principal.name)!!
        val groups = groupRepository.findAllByCreator_Id(creator.id)
        return groups.map { toGroupResponse(it, groupMemberRepository.findAllByGroup_Id(it.id)) }
    }

    @PostMapping("/group/edit/{id}")
    @Authenticate
    @ApiOperation(
        value = "edis the group created by the user",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun editGroup(
        @PathVariable id: Long,
        @RequestBody groupEdit: GroupEdit,
        @ApiIgnore principal: Principal
    ): GroupResponse {
        val creator = userRepository.findByEmail(principal.name)!!
        val group = groupRepository.findByIdOrNull(id) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Gruppo non trovato")
        if (group.creator.id != creator.id) {
            throw ErrorException(HttpStatus.BAD_REQUEST, "Non sei il creatore del gruppo!")
        } else {
            val users = mutableListOf<User>()
            val notFoundUsers = mutableListOf<String>()

            groupEdit.emails.forEach {
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

            val membersToRemove = alreadyMembers.filter { it.member !in users }
            val membersToAdd = (users - alreadyMembers.map { it.member }.toSet()).map { GroupMember(0, group, it) }

            groupMemberRepository.saveAll(membersToAdd)
            groupMemberRepository.deleteAll(membersToRemove)

            return toGroupResponse(groupRepository.save(group.copy(name = groupEdit.name)), groupMemberRepository.findAllByGroup_Id(group.id))
        }
    }

    @DeleteMapping("/group/created/{id}/remove")
    @Authenticate
    @ApiOperation(
        value = "remove member from group created by the user",
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
    @ApiOperation(
        value = "deletes the group created by the user",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
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
    @ApiOperation(
        value = "get groups joined by the user",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    fun getJoinedGroups(@ApiIgnore principal: Principal): List<GroupResponse> {
        val member = userRepository.findByEmail(principal.name)!!
        val groups = groupMemberRepository.findAllByMember_Id(member.id).map { it.group }
        return groups.map { toGroupResponse(it, groupMemberRepository.findAllByGroup_Id(it.id)) }
    }

    @DeleteMapping("/group/joined/{id}")
    @Authenticate
    @ApiOperation(
        value = "leaves the group joined by the user",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
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

    @PostMapping("/group/share/{groupId}/{noteId}")
    @ApiOperation(
        value = "shares a note with a group",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun shareNotes(@PathVariable groupId: Long, @PathVariable noteId: Long, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        val note =
            noteRepository.findByIdOrNull(noteId) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Nota non trovata")
        val group = groupRepository.findByIdOrNull(groupId) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Gruppo non trovato"
        )
        if (note.user.id != user.id || !groupUtils.isUserGroupCreatorOrMember(user.id, groupId)) throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Non puoi condividere la nota"
        )
        try {
            sharedNoteRepository.save(SharedNote(0, group, note))
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }
    }

    @DeleteMapping("/group/share/{groupId}/{noteId}")
    @ApiOperation(
        value = "unshares a note from a group",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun unshareNote(@PathVariable groupId: Long, @PathVariable noteId: Long, @ApiIgnore principal: Principal) {
        val user = userRepository.findByEmail(principal.name)!!
        val note =
            noteRepository.findByIdOrNull(noteId) ?: throw ErrorException(HttpStatus.BAD_REQUEST, "Nota non trovata")
        val group = groupRepository.findByIdOrNull(groupId) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Gruppo non trovato"
        )
        if (note.user.id != user.id || !groupUtils.isUserGroupCreatorOrMember(user.id, groupId)) throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Non puoi rimuovere la condivisione della nota"
        )
        val sharedNote = sharedNoteRepository.findByGroup_IdAndNote_Id(group.id, note.id) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Nota non condivisa col gruppo"
        )
        try {
            sharedNoteRepository.delete(sharedNote)
        } catch (e: Throwable) {
            throw GENERIC_ERROR
        }
    }

    @GetMapping("/group/shared/{groupId}")
    @ApiOperation(
        value = "gets a group sharing notes",
        authorizations = [Authorization(value = JWTConstants.TOKEN_PREFIX)]
    )
    @Authenticate
    fun getSharedNotes(@PathVariable groupId: Long, @ApiIgnore principal: Principal): List<NoteResponse> {
        val user = userRepository.findByEmail(principal.name)!!
        val group = groupRepository.findByIdOrNull(groupId) ?: throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Gruppo non trovato"
        )
        if (!groupUtils.isUserGroupCreatorOrMember(user.id, groupId)) throw ErrorException(
            HttpStatus.BAD_REQUEST,
            "Non fai parte del gruppo"
        )
        return sharedNoteRepository.findAllByGroup_Id(group.id).map { it.note.toNoteResponse() }
    }
}