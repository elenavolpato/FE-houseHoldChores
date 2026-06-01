import { createSlice } from "@reduxjs/toolkit"
import { getAllGroupMembers, sendGroupInvitation } from "../services/groupApi"

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupDetails: null,
    roommates: [],
    loading: false,
    error: null,
    inviteSuccess: false,
  },
  reducers: {
    clearGroupError: (state) => {
      state.error = null
    },
    resetInviteStatus: (state) => {
      state.inviteSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendGroupInvitation.pending, (state) => {
        state.loading = true
        state.error = null
        state.inviteSuccess = false
      })
      .addCase(sendGroupInvitation.fulfilled, (state) => {
        state.loading = false
        state.inviteSuccess = true
      })
      .addCase(sendGroupInvitation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "An error occurred while sending the invite."
      })
      .addCase(getAllGroupMembers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllGroupMembers.fulfilled, (state, action) => {
        state.loading = false
        state.roommates = action.payload
      })
      .addCase(getAllGroupMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearGroupError, resetInviteStatus } = groupSlice.actions
export default groupSlice.reducer
