import { createSlice } from "@reduxjs/toolkit"
import { createGroup, getAllGroupMembers, sendGroupInvitation, updateGroupNameApi } from "../services/groupApi"

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupName: "My household",
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
    updateGroupName: (state, action) => {
      state.groupName = action.payload
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
      .addCase(updateGroupNameApi.fulfilled, (state, action) => {
        if (state.user) {
          state.groupName = action.payload.name || action.payload.newGroupName || action.meta.arg.newGroupName
        }
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groupDetails = action.payload
        state.groupName = action.payload.name || action.payload.groupName // Adjust based on your API response keys
      })
  },
})

export const { clearGroupError, resetInviteStatus, updateGroupName } = groupSlice.actions
export default groupSlice.reducer
