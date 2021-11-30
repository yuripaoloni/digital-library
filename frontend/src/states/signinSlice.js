import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: { value: "", valid: false },
  password: { value: "", valid: false },
  valid: false,
  err: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail(state, action) {
      const valid = action.payload.includes("@");
      const allValid = valid && state.password.valid;
      state.email = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setPassword(state, action) {
      const valid = action.payload.length > 6;
      const allValid = valid && state.email.valid;
      state.password = { value: action.payload, valid: valid };
      state.valid = allValid;
    },
    setErr(state, action) {
      state.err = action.payload;
    },
  },
});

export default signinSlice.reducer;
export const signinActions = signinSlice.actions;
