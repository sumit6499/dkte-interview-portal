import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
  },

  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload.userInfo;
    },
  },
});

export const { authenticate, setUserInfo } = authSlice.actions;

export default authSlice.reducer