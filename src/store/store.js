import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./slices/counter";
import hiddenSlice from "./slices/hidden";
import cookiesSlice from "./slices/cookies";
import alertSlice from "./slices/alert"

// Connecting the store with the reducer
const store = configureStore({
  reducer: { counter: counterSlice, hidden: hiddenSlice, cookies: cookiesSlice, alert: alertSlice },
});

export default store;
