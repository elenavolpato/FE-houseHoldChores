import { createSlice } from "@reduxjs/toolkit"
import { fetchCurrentUserProfile } from "../services/authApi"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      const extractedToken = typeof action.payload === "object" ? action.payload.token || action.payload.accessToken : action.payload

      state.token = extractedToken
      if (extractedToken) {
        localStorage.setItem("token", extractedToken)
      }
    },
    logout: (state) => {
      localStorage.removeItem("token")
      state.token = null
      state.user = null
    },
    updateUserGroup: (state, action) => {
      if (state.user) {
        state.user.group = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export const selectIsLoggedIn = (state) => state.auth.token !== null
export const selectAuthToken = (state) => state.auth.token
export const { login, logout, updateUserGroup } = authSlice.actions

export default authSlice.reducer

/* const authSlice = createSlice({
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
*/
