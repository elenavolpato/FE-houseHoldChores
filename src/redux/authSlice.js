import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    login(state, action) {
      const extractedToken = typeof action.payload === "object" ? action.payload.token || action.payload.accessToken : action.payload

      state.token = extractedToken
      if (extractedToken) {
        localStorage.setItem("token", extractedToken)
      }
    },
    logout(state) {
      state.token = null
      localStorage.removeItem("token")
    },
  },
})

export const selectIsLoggedIn = (state) => state.auth.token !== null
export const selectAuthToken = (state) => state.auth.token

export const { login, logout } = authSlice.actions
export default authSlice.reducer
