package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.Group
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GroupRepository : JpaRepository<Group, Long>