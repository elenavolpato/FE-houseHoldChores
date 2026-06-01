import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllGroupMembers = createAsyncThunk("group/getAllGroupMembers", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth?.token

    if (!token) return thunkAPI.rejectWithValue("No token found.")

    // Point this directly to your Java server group endpoints
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/groups/members`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    if (!response.ok) return thunkAPI.rejectWithValue(data.message)

    return data // This becomes the action.payload
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})

export const updateAvatar = createAsyncThunk("auth/updateAvatar", async ({ file }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token
    const userId = thunkAPI.getState().auth.user?.id

    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const err = await response.text()
      return thunkAPI.rejectWithValue(err || "Upload failed.")
    }

    const avatarUrl = await response.text()
    return avatarUrl
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    return thunkAPI.rejectWithValue("Upload failed. Please try again.")
  }
})
