package it.unicam.cs.digital_library.network.bibliotecaunicam.model

data class BookPage(
    val id: Int,
    val bookId: Int,
    val name: String,
    val number: Int,
    val isFrontCover: Boolean,
    val isInitial: Boolean,
    val isFinal: Boolean,
    val isBackCover: Boolean
)