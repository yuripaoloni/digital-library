package it.unicam.cs.digital_library.controller.model

import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember

data class GroupResponse(val id: Long, val creator: UserResponse, val name: String, val members: List<UserResponse>)

fun toGroupResponse(group: Group, members: List<GroupMember>): GroupResponse {
    return GroupResponse(group.id,group.creator.toUserResponse(),group.name, members.map { it.member.toUserResponse()})
}