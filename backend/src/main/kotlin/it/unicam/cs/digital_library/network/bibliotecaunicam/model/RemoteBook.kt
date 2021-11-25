package it.unicam.cs.digital_library.network.bibliotecaunicam.model

data class RemoteBook(
    val id: Long,
    val bid: String,
    val title: String,
    val creators: String,
    val format: String?,
    val language: String?,
    val subject: String?,
    val edition: String?,
    val publisher: String?,
    val date: Int?,
    val otherTitles: String?,
    val classification: String?,
    val level: String?,
    val levelValue: String?,
    val description: String?,
    val contributor: String?,
    val type: String?,
    val source: String?,
    val relation: String?,
    val coverage: String?,
    val rights: String?,
    val pageNumber: Int,
    val dateAdded: String?,
    val pages: String?,
    val bookTags: String?,
    val digitizers: String?,
    val fund: String?,
    val missingCover: Boolean?,
    val status: Int?
)