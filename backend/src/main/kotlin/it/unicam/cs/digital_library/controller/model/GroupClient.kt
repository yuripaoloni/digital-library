package it.unicam.cs.digital_library.controller.model

data class GroupMemberClient(val email: String, val isAdmin: Boolean = false)

data class GroupCreation(val members: List<GroupMemberClient>, val name: String)

data class GroupEdit(val members: List<GroupMemberClient>, val name: String)