import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: { value: "", valid: false },
  lastName: { value: "", valid: false },
  email: { value: "", valid: false },
  password: { value: "", valid: false },
  valid: false,
  err: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFirstname(state, action) {
      const valid = action.payload.length > 3;
      const allValid =
        valid &&
        state.password.valid &&
        state.email.valid &&
        state.lastName.valid;
      state.firstName = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setLastname(state, action) {
      const valid = action.payload.length > 3;
      const allValid =
        valid &&
        state.password.valid &&
        state.email.valid &&
        state.firstName.valid;
      state.lastName = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setEmail(state, action) {
      const valid = action.payload.includes("@");
      const allValid =
        valid &&
        state.password.valid &&
        state.firstName.valid &&
        state.lastName.valid;
      state.email = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setPassword(state, action) {
      const valid = action.payload.length > 6;
      const allValid =
        valid &&
        state.email.valid &&
        state.firstName.valid &&
        state.lastName.valid;
      state.password = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setErr(state, action) {
      state.err = action.payload;
    },
  },
});

export default signupSlice.reducer;
export const signupActions = signupSlice.actions;
