import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGroup } from "api";

const initialState = {
  loading: false,
  joinedGroups: [],
  createdGroups: [],
  error: false,
};

export const onCreateGroup = createAsyncThunk(
  "create/groups",
  async ({ emails, name }) => {
    const res = await createGroup(emails, name);
    return res.data;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(onCreateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [...state.createdGroups, action.payload];
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
          state.error = {
            error: true,
            variant: "error",
            message: "Errore nella richiesta. Prova di nuovo.",
          };
        }
      );
  },
});

const { actions, reducer } = groupsSlice;

export const { unsetError, setError } = actions;

export default reducer;
