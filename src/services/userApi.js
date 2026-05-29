/* import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGroupMembers = createAsyncThunk("user/fetchMyGroups", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found.")
    }

    const response = await fetch(`http://localhost:3001/api/groups/${}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to load groups.")
    }

    return data // Returns the List<GroupResponseDTO> array

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Server connection failed.")
  } 
})*/
