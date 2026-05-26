import { configureStore } from "@reduxjs/toolkit"
import choresSlice from "./redux/choresSlice"

export const store = configureStore({
  reducer: {
    chores: choresSlice,
  },
})
