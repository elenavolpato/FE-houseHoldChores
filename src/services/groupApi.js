import { createAsyncThunk } from "@reduxjs/toolkit"

export const createGroup = createAsyncThunk("group/create", async (groupName, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found.")
    }

    const response = await fetch("http://localhost:3001/api/groups/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupName }),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to create group.")
    }

    return data
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})
