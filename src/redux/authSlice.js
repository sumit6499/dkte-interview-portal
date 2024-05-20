
import { createSlice } from "@reduxjs/toolkit";
//load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    // console.log("Serialized State:", serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
// save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch {
    //  error
  }
};
const initialState = loadState() || {
  users: [],
  currentUser: null,
  token: null,
  Uid: null,
  Name:null,
  Role:null,
  Day:null,
  StartTime:null,
  EndTime:null,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
      saveState(state); 
    },
    setUserInfo: (state, action) => {
      const { user, token, Uid, Name, Role, Day, StartTime, EndTime } =
        action.payload;
      state.currentUser = user;
      state.token = token;
      state.Uid = Uid;
      state.Name = Name;
      
        state.Day = Day;
        state.StartTime = StartTime;
        state.EndTime = EndTime;
      
      state.Role = Role;
      state.isAuthenticated = true;

      const existingUserIndex = state.users.findIndex((u) => u.Uid === Uid);
      if (existingUserIndex !== -1) {
        state.users[existingUserIndex] = {
          user,
          token,
          Uid,
          Name,
          Role,
          Day,
          StartTime,
          EndTime,
        };
      } else {
        state.users.push({
          user,
          token,
          Uid,
          Name,
          Role,
          Day,
          StartTime,
          EndTime,
        });
      }

      saveState(state); 
    },
    logOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.Uid = null;
      state.Name = null;
      state.Role = null;
      state.Day = null;
      state.StartTime = null;
      state.EndTime = null;
      state.isAuthenticated = false;
      saveState(state);
    },
  },
});
export const { authenticate, setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUid = (state) => state.auth.Uid;
export const selectCurrentName = (state) => state.auth.Name;
export const selectCurrentRole = (state) => state.auth.Role;
export const selectCurrentDay = (state) => state.auth.Day;
export const selectCurrentStartTime = (state) => state.auth.StartTime;
export const selectCurrentEndTime = (state) => state.auth.EndTime;
export const selectAllUsers = (state) => state.auth.users;
export const setUsers = (users) => {
  console.log("Dispatching setUsers action with users:", users);
  return {
    type: "auth/setUsers",
    payload: users,
  };
};