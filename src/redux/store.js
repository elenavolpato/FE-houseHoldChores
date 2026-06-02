import { configureStore } from "@reduxjs/toolkit"
import choresSlice from "@/redux/choresSlice"
import authReducer from "@/redux/authSlice"
import groupReducer from "@/redux/groupSlice"

export const store = configureStore({
  reducer: {
    chores: choresSlice,
    group: groupReducer,
    auth: authReducer,
  },
})
