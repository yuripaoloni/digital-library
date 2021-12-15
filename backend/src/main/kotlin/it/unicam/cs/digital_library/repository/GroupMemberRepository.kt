package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Group
import it.unicam.cs.digital_library.model.GroupMember
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupMemberRepository : JpaRepository<GroupMember, Long>