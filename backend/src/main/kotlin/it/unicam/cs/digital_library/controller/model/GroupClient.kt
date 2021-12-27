package it.unicam.cs.digital_library.controller.model

data class GroupCreation(val emails: List<String>, val name: String)

data class GroupEdit(val emails: List<String>, val name: String)