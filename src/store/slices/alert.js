import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  alert: { visible: false, hue: null, boldText: null, text: null, icon: null },
};

// Slice function
const stateSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    error(state) {
      state.alert = {
        visible: true,
        hue: 0,
        boldText: "Oops,",
        text: " something went wrong. Please try again later.",
        icon: "error",
      };
    },
    success(state) {
      state.alert = {
        visible: true,
        hue: 120,
        boldText: "Congratulations!",
        text: " Your cookie has been added to your cookie jar.",
        icon: "success",
      };
    },
    clear(state) {
      state.alert = {
        visible: false,
        hue: null,
        boldText: null,
        text: null,
        icon: null,
      };
    },
    removeCookieSuccess(state) {
      state.alert = {
        visible: true,
        hue: 120,
        boldText: "",
        text: "The cookie has been successfully removed from your cookie jar.",
        icon: "success",
      };
    },
    saveChangeSuccess(state) {
      state.alert = {
        visible: true,
        hue: 120,
        boldText: "",
        text: "Your changes have been successfully saved.",
        icon: "success",
      };
    },
  },
});

// Export the actions that will be used to change the state in the components
export const alertActions = stateSlice.actions;

// Exporting the reducer that will be used in the store
export default stateSlice.reducer;
