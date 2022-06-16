import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { counter: "" };

// Slice function
const stateSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      if (state.counter === -1) {
        state.counter = "";
      } else {
        state.counter++;
      }
    },
    decrement(state) {
      if (state.counter === 1) {
        state.counter = "";
      } else {
        state.counter--;
      }
    },
  },
});

// Export the actions that will be used to change the state in the components
export const counterActions = stateSlice.actions;

// Exporting the reducer that will be used in the store
export default stateSlice.reducer;
