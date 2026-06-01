import { createSlice } from "@reduxjs/toolkit"
import { fetchCurrentUserProfile } from "@/services/authApi"
import { deleteUserAccount } from "../services/authApi"
import { updateAvatar } from "../services/userApi"

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
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false
        // Purge state data completely since their account is deleted
        localStorage.removeItem("token")
        state.token = null
        state.user = null
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "An error occurred during deletion."
      })

      .addCase(updateAvatar.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false
        state.user.avatarUrl = action.payload
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export const selectIsLoggedIn = (state) => state.auth.token !== null
export const selectAuthToken = (state) => state.auth.token
export const { login, logout, updateUserGroup } = authSlice.actions

export default authSlice.reducer
