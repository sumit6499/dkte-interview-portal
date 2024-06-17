import { createSlice } from "@reduxjs/toolkit";

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch {
    // Ignore write errors
  }
};

// Initial state
const initialState = loadState() || {
  users: [],
  currentUser: null,
  token: null,
  Uid: null,
  Name: null,
  Role: null,
  Day: null,
  StartTime: null,
  EndTime: null,
  Dept: null,
  PRN: null,
  isAuthenticated: false,
};

// Create slice
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
      saveState(state);
    },
    setUserInfo: (state, action) => {
      const {
        user,
        token,
        Uid,
        Name,
        Role,
        Day,
        StartTime,
        EndTime,
        Dept,
        PRN,
      } = action.payload;
      state.currentUser = user;
      state.token = token;
      state.Uid = Uid;
      state.Name = Name;
      state.Dept = Dept;
      state.PRN = PRN;
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
          Dept,
          PRN,
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
          Dept,
          PRN,
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
      state.Dept = null;
      state.PRN = null;
      state.isAuthenticated = false;

      // Clear the local storage
      localStorage.removeItem("authState");
    },
  },
});

export const { authenticate, setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUid = (state) => state.auth.Uid;
export const selectCurrentName = (state) => state.auth.Name;
export const selectCurrentRole = (state) => state.auth.Role;
export const selectCurrentDay = (state) => state.auth.Day;
export const selectCurrentStartTime = (state) => state.auth.StartTime;
export const selectCurrentEndTime = (state) => state.auth.EndTime;
export const selectCurrentDept = (state) => state.auth.Dept;
export const selectCurrentPRN = (state) => state.auth.PRN;
export const selectAllUsers = (state) => state.auth.users;

export const setUsers = (users) => {
  console.log("Dispatching setUsers action with users:", users);
  return {
    type: "auth/setUsers",
    payload: users,
  };
};
