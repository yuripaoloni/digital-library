package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface GroupRepository : JpaRepository<Group, Long> {
    @Query("select GroupMember from Group,GroupMember where GroupMember.group.id=Group.id and Group.creator.id=?1")
    fun findAllByCreator_Id(creator_id: Int): List<GroupMember>
}