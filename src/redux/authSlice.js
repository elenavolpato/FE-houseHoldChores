import { createSlice } from "@reduxjs/toolkit"
import { fetchCurrentUserProfile } from "@/services/authApi"
import { deleteUserAccount } from "../services/authApi"
import { updateAvatar } from "../services/userApi"
import { updateGroupNameApi } from "../services/groupApi"

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
    updateUsername: (state, action) => {
      if (state.user) {
        state.user.username = action.payload
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
        state.token = null
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false
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
        if (state.user) {
          state.user.avatarUrl = action.payload
        }
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateGroupNameApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateGroupNameApi.fulfilled, (state, action) => {
        state.loading = false
        if (state.user) {
          state.user.groupName = action.payload.name || action.payload.newGroupName || action.meta.arg.newGroupName
        }
      })
      .addCase(updateGroupNameApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const selectIsLoggedIn = (state) => state.auth.token !== null
export const selectAuthToken = (state) => state.auth.token

export const { login, logout, updateUserGroup, updateUsername } = authSlice.actions

export default authSlice.reducer
