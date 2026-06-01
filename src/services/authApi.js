import { createAsyncThunk } from "@reduxjs/toolkit"
import { logout } from "../redux/authSlice"

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

    if (response.status === 401 || response.status === 403) {
      thunkAPI.dispatch(logout())
      return thunkAPI.rejectWithValue("Session expired. Please log in again.")
    }

    const data = await response.json()
    if (!response.ok) return thunkAPI.rejectWithValue(data.message)
    return data

    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    return thunkAPI.rejectWithValue("Network error. Please try again.")
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
