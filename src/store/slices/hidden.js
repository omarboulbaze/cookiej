import { createSlice } from "@reduxjs/toolkit";

// Initial state
const hiddenInit = { hidden: true };

// Slice function
const hiddenSlice = createSlice({
  name: "hidden",
  initialState: hiddenInit,
  reducers: {
    hide(state) {
      state.hidden = !state.hidden;
    },
  },
});

// Export the actions that will be used to change the state in the components
export const hiddenActions = hiddenSlice.actions;

// Exporting the reducer that will be used in the store
export default hiddenSlice.reducer;
