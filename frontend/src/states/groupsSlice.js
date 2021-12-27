import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  editGroup,
  getCreatedGroups,
  getJoinedGroups,
  leaveGroup,
  removeUsersFromGroup,
} from "api";

const initialState = {
  loading: false,
  joinedGroups: [],
  createdGroups: [],
  selectedGroup: null,
  error: false,
};

export const onCreateGroup = createAsyncThunk(
  "createGroup/groups",
  async ({ emails, name }) => {
    const res = await createGroup(emails, name);
    return res.data;
  }
);

export const onEditGroup = createAsyncThunk(
  "editGroup/groups",
  async ({ emails, name }, { getState }) => {
    const state = getState();
    const res = await editGroup(state.groups.selectedGroup.id, emails, name);
    return res.data;
  }
);

export const onFetchGroups = createAsyncThunk(
  "fetchGroups/groups",
  async () => {
    const joinedGroups = await getJoinedGroups();
    const createdGroups = await getCreatedGroups();
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
        let updatedGroups = state.createdGroups.filter(
          (group) => group.id !== action.payload
        );
        state.loading = false;
        state.createdGroups = [...updatedGroups];
      })
      .addCase(onExitGroup.fulfilled, (state, action) => {
        let updatedGroups = state.joinedGroups.filter(
          (group) => group.id !== action.payload
        );
        state.loading = false;
        state.joinedGroups = [...updatedGroups];
      })
      .addCase(onEditGroup.fulfilled, (state, action) => {
        let updatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        state.loading = false;
        state.createdGroups = [...updatedGroups];
      })
      .addCase(onDeleteMember.fulfilled, (state, action) => {
        let updatedGroups = state.createdGroups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        );
        state.loading = false;
        state.createdGroups = [...updatedGroups];
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