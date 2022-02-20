package it.unicam.cs.digital_library

import it.unicam.cs.digital_library.controller.BookController
import it.unicam.cs.digital_library.controller.model.*
import it.unicam.cs.digital_library.init.BaseTest
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER1
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER2
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER3
import it.unicam.cs.digital_library.init.DatabaseInitializer.USER4
import it.unicam.cs.digital_library.init.Method
import it.unicam.cs.digital_library.init.withLogin
import it.unicam.cs.digital_library.model.Book
import it.unicam.cs.digital_library.network.LibraryService
import it.unicam.cs.digital_library.repository.*
import it.unicam.cs.digital_library.utils.fromJson
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@TestPropertySource(properties = [], locations = ["classpath:application-test.properties"])
class GroupControllerTest(
    @Autowired private val mockMvc: MockMvc,
    @Autowired private val bookController: BookController,
    @Autowired libraryService: LibraryService,
    @Autowired libraryRepository: LibraryRepository,
    @Autowired userRepository: UserRepository,
    @Autowired bookRepository: BookRepository,
    @Autowired bookmarkRepository: BookmarkRepository,
    @Autowired noteRepository: NoteRepository,
    @Autowired sharedNoteRepository: SharedNoteRepository,
    @Autowired groupRepository: GroupRepository,
    @Autowired groupMemberRepository: GroupMemberRepository,
    @Autowired favoriteBookRepository: FavoriteBookRepository,
    @Autowired bCryptPasswordEncoder: BCryptPasswordEncoder
) : BaseTest(
    libraryService,
    libraryRepository,
    userRepository,
    bookRepository,
    bookmarkRepository,
    noteRepository,
    sharedNoteRepository,
    groupRepository,
    groupMemberRepository,
    favoriteBookRepository,
    bCryptPasswordEncoder
) {

    @Test
    fun createGroupTest() {
        // create group
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // create group  --- error creator as member
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(
                listOf(
                    GroupMemberClient(USER1, false),
                    GroupMemberClient(USER2, false),
                    GroupMemberClient(USER3, false)
                ), "Group 2"
            )
        ).andExpect {
            status { is4xxClientError() }
        }

        // create group --- error member not found
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(
                listOf(
                    GroupMemberClient("prova@gmail.com", false),
                    GroupMemberClient(USER2, false),
                    GroupMemberClient(USER3, false)
                ), "Group 2"
            )
        ).andExpect {
            status { is4xxClientError() }
        }

    }

    @Test
    fun groupCreatedTest() {
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // group created by user
        mockMvc.withLogin(
            USER1,
            Method.GET,
            "/group/created"
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<GroupResponse>>()!!.let { assert(it.isNotEmpty()) }

    }

    @Test
    fun groupEditTest() {
        var groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // group edit
        groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/${groupResponse.id}/edit",
            GroupEdit(listOf(GroupMemberClient(USER2, true), GroupMemberClient(USER3), GroupMemberClient(USER4)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/${groupResponse.id}/edit",
            GroupEdit(
                listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3), GroupMemberClient(USER4)),
                "Group 1"
            )
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // group edit error, not admin
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/group/${groupResponse.id}/edit",
            GroupEdit(
                listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, true), GroupMemberClient(USER4)),
                "Group 1"
            )
        ).andExpect {
            status { is4xxClientError() }
        }

        // group edit error --- users not found
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/${groupResponse.id}/edit",
            GroupEdit(listOf(GroupMemberClient("sample@gmail.com")), "Group 1")
        ).andExpect {
            status { is4xxClientError() }
        }

        // group edit error --- creator in members
        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/${groupResponse.id}/edit",
            GroupEdit(listOf(GroupMemberClient(USER1)), "Group 1")
        ).andExpect {
            status { is4xxClientError() }
        }

    }

    @Test
    fun groupJoinedTest() {

        val groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // group joined
        mockMvc.withLogin(
            USER3,
            Method.GET,
            "/group/joined"
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<GroupResponse>>()!!.let { assert(it.isNotEmpty()) }

        // group joined delete
        mockMvc.withLogin(
            USER3,
            Method.DELETE,
            "/group/joined/${groupResponse.id}"
        ).andExpect {
            status { isOk() }
        }

    }

    @Test
    fun groupSharedTest() {

        val groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER4, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        val book = bookController.getRandomBooks().first().first()

        val user1NoteResponse = createNote(USER1, book, 1)
        val user2NoteResponse = createNote(USER2, book, 2)
        val user4NoteResponse = createNote(USER4, book, 4)

        // share note
        listOf(user1NoteResponse, user2NoteResponse, user4NoteResponse).map {
            mockMvc.withLogin(
                it.user.email,
                Method.POST,
                "/group/share/${groupResponse.id}/${it.id}"
            ).andExpect {
                status { isOk() }
            }
        }


        // share note --- trying to share a note you didn't create
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/group/share/${groupResponse.id}/${user1NoteResponse.id}"
        ).andExpect {
            status { is4xxClientError() }
        }

        // share note --- group not found
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/group/share/2000000/${user1NoteResponse.id}"
        ).andExpect {
            status { is4xxClientError() }
        }

        // share note --- note not found
        mockMvc.withLogin(
            USER2,
            Method.POST,
            "/group/share/${groupResponse.id}/200000"
        ).andExpect {
            status { is4xxClientError() }
        }

        // unshare note
        mockMvc.withLogin(
            USER2,
            Method.DELETE,
            "/group/share/${groupResponse.id}/${user2NoteResponse.id}"
        ).andExpect {
            status { isOk() }
        }

        mockMvc.withLogin(
            USER1,
            Method.GET,
            "/group/shared/${groupResponse.id}"
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<NoteResponse>>()!!.let { assert(it.isNotEmpty()) }

        mockMvc.withLogin(
            USER1,
            Method.POST,
            "/note/all/shared",
            book
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<List<NoteGroupResponse>>()!!.let { assert(it.isNotEmpty()) }

    }

    @Test
    fun groupDeleteTest() {

        val groupResponse = mockMvc.withLogin(
            USER1,
            Method.POST,
            "/group/create",
            GroupCreation(listOf(GroupMemberClient(USER2, false), GroupMemberClient(USER3, false)), "Group 1")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<GroupResponse>()!!

        // group delete
        mockMvc.withLogin(
            USER1,
            Method.DELETE,
            "/group/${groupResponse.id}"
        ).andExpect {
            status { isOk() }
        }

        // group delete --- creator error
        mockMvc.withLogin(
            USER2,
            Method.DELETE,
            "/group/${groupResponse.id}"
        ).andExpect {
            status { is4xxClientError() }
        }

        // group delete --- group not found
        mockMvc.withLogin(
            USER1,
            Method.DELETE,
            "/group/2000000"
        ).andExpect {
            status { is4xxClientError() }
        }
    }

    private fun createNote(email: String, book: Book, page: Int): NoteResponse {
        return mockMvc.withLogin(
            email,
            Method.POST,
            "/note/add",
            NoteCreation(book, page, "Note 1", "Note 1 description")
        ).andExpect {
            status { isOk() }
        }.andReturn().response.contentAsString.fromJson<NoteResponse>()!!
    }
}
