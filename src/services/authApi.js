import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchCurrentUserProfile = createAsyncThunk("auth/fetchCurrentUserProfile", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token

    if (!token) return thunkAPI.rejectWithValue("No token found")

    const response = await fetch("http://localhost:3001/api/users/me", {
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
