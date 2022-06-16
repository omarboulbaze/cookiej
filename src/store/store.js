import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./slices/counter";
import hiddenSlice from "./slices/hidden";
import cookiesSlice from "./slices/cookies";

// Connecting the store with the reducer
const store = configureStore({
  reducer: { counter: counterSlice, hidden: hiddenSlice, cookies: cookiesSlice },
});

export default store;
