import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllGroupMembers } from "../services/groupApi"

export const sendGroupInvitation = createAsyncThunk("group/sendGroupInvitation", async ({ recipientEmail, recipientName }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth?.token

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found.")
    }

    const response = await fetch("http://localhost:3001/api/invitations/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail,
        recipientName,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to send invitation.")
    }

    return data
  } catch (error) {
    console.error("Invitation Dispatch Error:", error)
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})

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
