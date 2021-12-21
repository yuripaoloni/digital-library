package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.SharedNote
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SharedNoteRepository : JpaRepository<SharedNote, Long> {
    fun findByGroup_IdAndNote_Id(group_id: Long, note_id: Long): SharedNote?
    fun findAllByGroup_Id(group_id: Long): List<SharedNote>
}