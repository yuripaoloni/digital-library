package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import org.springframework.util.Base64Utils

class GroupMemberResponse(
    val email: String,
    val username: String,
    val name: String,
    val surname: String,
    val picture: String?,
    val isAdmin: Boolean
)

fun GroupMember.toGroupMemberResponse(): GroupMemberResponse {
    return GroupMemberResponse(
        member.email,
        member.username,
        member.name,
        member.surname,
        member.picture?.let { Base64Utils.encodeToString(it) },
        isAdmin
    )
}

data class GroupResponse(
    val id: Long,
    val creator: UserResponse,
    val name: String,
    val members: List<GroupMemberResponse>
)

fun toGroupResponse(group: Group, members: List<GroupMember>): GroupResponse {
    return GroupResponse(
        group.id,
        group.creator.toUserResponse(),
        group.name,
        members.map { it.toGroupMemberResponse() })
}