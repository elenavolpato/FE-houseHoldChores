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
    console.log(error)
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})
