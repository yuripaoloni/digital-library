package it.unicam.cs.digital_library.network

import it.unicam.cs.digital_library.model.Library
import it.unicam.cs.digital_library.network.bibliotecaunicam.BibliotecaUnicamService

object LibraryManager {
    const val BIBLIOTECA_UNICAM_ID: Long = 0

    fun getLibraries(): List<Library> = getLibraryServices().map { it.getLibrary() }

    fun getLibraryServices(): List<ILibraryService> = listOf(BibliotecaUnicamService())
}