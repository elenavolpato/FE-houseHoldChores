import { configureStore } from "@reduxjs/toolkit"
import choresSlice from "@/redux/choresSlice"
import authReducer from "@/redux/authSlice"

export const store = configureStore({
  reducer: {
    chores: choresSlice,
    auth: authReducer,
  },
})
