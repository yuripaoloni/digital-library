import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  editGroup,
  getCreatedGroups,
  getGroupSharedNotes,
  getJoinedGroups,
  leaveGroup,
  removeUsersFromGroup,
  shareNote,
  unshareNote,
} from "api";
import { addSharedNote, removeUnsharedNote } from "./booksSlice";

const initialState = {
  loading: false,
  joinedGroups: [],
  createdGroups: [],
  selectedGroup: null,
  error: false,
};

export const onCreateGroup = createAsyncThunk(
  "createGroup/groups",
  async ({ users, name }) => {
    const res = await createGroup(users, name);
    return res.data;
  }
);

export const onEditGroup = createAsyncThunk(
  "editGroup/groups",
  async ({ users, name }, { getState }) => {
    const state = getState();
    const res = await editGroup(state.groups.selectedGroup.id, users, name);
    let notes = await getGroupSharedNotes(state.groups.selectedGroup.id);
    res.data.notes = notes.data;
    return res.data;
  }
);

export const onFetchGroups = createAsyncThunk(
  "fetchGroups/groups",
  async () => {
    const joinedGroups = await getJoinedGroups();
    const createdGroups = await getCreatedGroups();
    for (const joinedGroup of joinedGroups.data) {
      let res = await getGroupSharedNotes(joinedGroup.id);
      joinedGroup.notes = res.data;
    }
    for (const createdGroup of createdGroups.data) {
      let res = await getGroupSharedNotes(createdGroup.id);
      createdGroup.notes = res.data;
    }
    return {
      joinedGroups: joinedGroups.data,
      createdGroups: createdGroups.data,
    };
  }
);

export const onDeleteMember = createAsyncThunk(
  "deleteMember/groups",
  async ({ id, emails }) => {
    const res = await removeUsersFromGroup(emails, id);
    let notes = await getGroupSharedNotes(id);
    res.data.notes = notes.data;
    return res.data;
  }
);

export const onDeleteGroup = createAsyncThunk(
  "deleteGroup/groups",
  async (arg, { getState }) => {
    const state = getState();
    await deleteGroup(state.groups.selectedGroup.id);
    return state.groups.selectedGroup.id;
  }
);

export const onExitGroup = createAsyncThunk(
  "exitGroup/groups",
  async (arg, { getState }) => {
    const state = getState();
    await leaveGroup(state.groups.selectedGroup.id);
    return state.groups.selectedGroup.id;
  }
);

export const onShareNote = createAsyncThunk(
  "shareNote/groups",
  async ({ groupId, noteId }, { dispatch }) => {
    const res = await shareNote(groupId, noteId);
    dispatch(addSharedNote(res.data));
    return { note: res.data, groupId: groupId };
  }
);

export const onUnshareNote = createAsyncThunk(
  "unshareNote/groups",
  async ({ groupId, noteId }, { dispatch }) => {
    await unshareNote(groupId, noteId);
    dispatch(removeUnsharedNote(noteId));
    return { noteId: noteId, groupId: groupId };
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    unsetError: (state) => {
      state.error = { error: false, variant: "error", message: "" };
    },
    setError: (state) => {
      state.error = {
        error: true,
        variant: "error",
        message: "Errore nella richiesta. Prova di nuovo.",
      };
    },
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onCreateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.createdGroups = [...state.createdGroups, action.payload];
      })
      .addCase(onFetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedGroups = action.payload.joinedGroups;
        state.createdGroups = action.payload.createdGroups;
      })
      .addCase(onDeleteGroup.fulfilled, (state, action) => {
        let updatedCreatedGroups = state.createdGroups.filter(
          (group) => group.id !== action.payload
        );
        let updatedJoinedGroups = state.joinedGroups.filter(
          (group) => group.id !== action.payload
        );
        state.loading = false;
        state.createdGroups = [...updatedCreatedGroups];
        state.joinedGroups = [...updatedJoinedGroups];
      })
      .addCase(onExitGroup.fulfilled, (state, action) => {
        let updatedGroups = state.joinedGroups.filter(
          (group) => group.id !== action.payload
        );
        state.loading = false;
        state.joinedGroups = [...updatedGroups];
      })
      .addCase(onEditGroup.fulfilled, (state, action) => {
        let updatedCreatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        let updatedJoinedGroups = state.joinedGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        state.loading = false;
        state.createdGroups = [...updatedCreatedGroups];
        state.joinedGroups = [...updatedJoinedGroups];
      })
      .addCase(onShareNote.fulfilled, (state, action) => {
        let updateCreatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.groupId
            ? { ...group, notes: [...group.notes, action.payload.note] }
            : group
        );
        let updateJoinedGroups = state.joinedGroups.map((group) =>
          group.id === action.payload.groupId
            ? { ...group, notes: [...group.notes, action.payload.note] }
            : group
        );
        state.loading = false;
        state.createdGroups = [...updateCreatedGroups];
        state.joinedGroups = [...updateJoinedGroups];
      })
      .addCase(onUnshareNote.fulfilled, (state, action) => {
        let updateCreatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                notes: group.notes.filter(
                  (note) => note.id !== action.payload.noteId
                ),
              }
            : group
        );
        let updateJoinedGroups = state.joinedGroups.map((group) =>
          group.id === action.payload.groupId
            ? {
                ...group,
                notes: group.notes.filter(
                  (note) => note.id !== action.payload.noteId
                ),
              }
            : group
        );
        state.loading = false;
        state.createdGroups = [...updateCreatedGroups];
        state.joinedGroups = [...updateJoinedGroups];
      })
      .addCase(onDeleteMember.fulfilled, (state, action) => {
        let updatedCreatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        let updatedJoinedGroups = state.joinedGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        state.loading = false;
        state.createdGroups = [...updatedCreatedGroups];
        state.joinedGroups = [...updatedJoinedGroups];
      })
      .addMatcher(
        (action) => action.type?.endsWith("groups/pending"),
        (state) => {
          state.loading = true;
          state.error = { error: false, variant: "error", message: "" };
        }
      )
      .addMatcher(
        (action) => action.type?.endsWith("groups/rejected"),
        (state) => {
          state.loading = false;
          state.error.error = true;
          state.error.variant = "error";
          state.error.message = localStorage.getItem("authToken")
            ? "Errore durante il recupero dei dati. Prova di nuovo."
            : "Effettua nuovamente il login.";
        }
      );
  },
});

const { actions, reducer } = groupsSlice;

export const { unsetError, setError, selectGroup } = actions;

export default reducer;
