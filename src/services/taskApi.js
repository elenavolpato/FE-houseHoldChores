import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token
    if (!token) {
      return thunkAPI.rejectedWithValue("No authentication token found")
    }

    const response = await fetch("http://localhost:3001/api/tasks/presets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectedWithValue(data.message || "Failed to load tasks.")
    }
    return data

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Server connection failed")
  }
})

export const createTaskFromPreset = createAsyncThunk("task/createTaskFromPreset", async ({ presetId, dueDate }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    // Look up current user details directly from the logged-in auth state container
    const currentUserId = state.auth.user?.id
    const currentGroupId = state.auth.user?.groupId

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    if (!currentGroupId) {
      return thunkAPI.rejectWithValue("You must join or create a household group before scheduling chores.")
    }

    const requestBody = {
      presetId: presetId,
      assignedUserId: currentUserId,
      groupId: currentGroupId,
      dueDate: dueDate,
      frequency: 0,
    }

    const response = await fetch("http://localhost:3001/api/tasks/create-from-preset", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to instantiate task from preset template.")
    }

    return data

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
  }
})
