import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userCredentials, thunkAPI) => {
    try {
      const request = await axios.post("http://localhost:3000/api/v1/auth/interview/schedule", userCredentials);
      // Assuming response contains user info or authentication token
      const response = await request.data.data;
      localStorage.setItem('auth', JSON.stringify(response));
      return response;
    } catch (error) {
      // You can handle errors here
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  // extraReducers:(builder)=>{
  //   builder.addCase(loginUser.fulfilled, (state, action) => {
  //     state.isAuthenticated = true;
  //     state.user = action.payload;
  //   });
  //   builder.addCase(loginUser.rejected, (state, action) => {
  //     state.isAuthenticated = false;
  //     state.user = {};
  //   });
  // }
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