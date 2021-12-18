package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.GroupMember
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupMemberRepository : JpaRepository<GroupMember, Long> {
    fun findAllByGroup_Id(group_id: Long): List<GroupMember>
    fun findAllByMember_Id(member_id: Int): List<GroupMember>
    fun findByGroup_IdAndMember_Id(group_id: Long, member_id: Int): GroupMember?
}