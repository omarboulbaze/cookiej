import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { hidden: true };

// Slice function
const stateSlice = createSlice({
  name: "hidden",
  initialState: initialState,
  reducers: {
    hide(state) {
      state.hidden = !state.hidden;
    },
  },
});

// Export the actions that will be used to change the state in the components
export const hiddenActions = stateSlice.actions;

// Exporting the reducer that will be used in the store
export default stateSlice.reducer;
