import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCurrentUserProfile = createAsyncThunk("auth/fetchCurrentUserProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token

    if (!token) return thunkAPI.rejectWithValue("No token found")

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    if (!response.ok) return thunkAPI.rejectWithValue(data.message)

    return data
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to sync profile.")
  }
})

export const deleteUserAccount = createAsyncThunk("auth/deleteUserAccount", async (successorId, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) return thunkAPI.rejectWithValue("No auth token found.")

    // 🚀 Append query parameter if a successor was selected
    const url = successorId ? `${import.meta.env.VITE_API_URL}/api/users/delete?successorId=${successorId}` : `${import.meta.env.VITE_API_URL}/api/users/delete`

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    if (!response.ok) return thunkAPI.rejectWithValue(data.message)

    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})
