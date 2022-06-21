import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { cookies: [], groups: [] };

// Slice function
const stateSlice = createSlice({
  name: "cookies",
  initialState: initialState,
  reducers: {
    setCookies(state, action) {
      state.cookies = action.payload;
    },
    setGroups(state, action) {
      state.groups = action.payload;
    },
    clearGroups(state) {
      state.groups = [];
    },
  },
});

// Export the actions that will be used to change the state in the components
export const cookiesActions = stateSlice.actions;

// Exporting the reducer that will be used in the store
export default stateSlice.reducer;
