import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReducers,
  
  },
});
