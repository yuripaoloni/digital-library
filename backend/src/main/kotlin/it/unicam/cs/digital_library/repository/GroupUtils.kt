package it.unicam.cs.digital_library.repository

class GroupUtils(
    private val groupRepository: GroupRepository,
    private val groupMemberRepository: GroupMemberRepository
) {
    fun isUserGroupCreatorOrMember(
        user_id: Int, group_id: Long
    ): Boolean {
        return (groupRepository.findByIdAndCreator_Id(
            group_id, user_id
        ) ?: groupMemberRepository.findByGroup_IdAndMember_Id(
            group_id, user_id
        )) != null
    }

    /**
     * checks if the user is the creator of the group or an admin member
     */
    fun isGroupAdmin(
        user_id: Int, group_id: Long
    ): Boolean {
        val isCreator = groupRepository.findByIdAndCreator_Id(group_id, user_id) != null
        if (isCreator) return true
        val isAdminMember = groupMemberRepository.findByGroup_IdAndMember_Id(group_id, user_id)?.isAdmin
        if (isAdminMember != null && isAdminMember) return true
        return false
    }
}