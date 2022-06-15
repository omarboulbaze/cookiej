import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./slices/counter";
import hiddenSlice from "./slices/hidden";

// Connecting the store with the reducer
const store = configureStore({
  reducer: { counter: counterSlice, hidden: hiddenSlice },
});

export default store;
