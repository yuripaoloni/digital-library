package it.unicam.cs.digital_library.repository

import it.unicam.cs.digital_library.model.FavoriteBook
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FavoriteBookRepository : JpaRepository<FavoriteBook, Long> {
    fun findByUser_Id(user_id: Int)
}