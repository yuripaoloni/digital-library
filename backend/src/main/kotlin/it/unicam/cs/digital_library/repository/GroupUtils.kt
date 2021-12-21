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
}