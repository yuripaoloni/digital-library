package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Group
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupRepository : JpaRepository<Group, Long> {
    fun findAllByCreator_Id(creator_id: Int): List<Group>
    fun findByIdAndCreator_Id(id: Long, creator_id: Int): Group?
}