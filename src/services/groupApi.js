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

export const getAllGroupMembers = createAsyncThunk("group/members", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    const targetGroupId = state.auth.user?.groupId

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found.")
    }
    if (!targetGroupId) {
      return thunkAPI.rejectWithValue("You are not currently linked to a household group.")
    }

    const response = await fetch(`http://localhost:3001/api/groups/${targetGroupId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to retrieve group members.")
    }

    return data
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})

export const updateGroupNameApi = createAsyncThunk("group/updateGroupNameApi", async ({ groupId, newGroupName }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token
    console.log(groupId, "here", newGroupName)
    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found.")
    }

    const response = await fetch(`http://localhost:3001/api/groups/${groupId}/rename`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newGroupName }),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to rename.")
    }

    return data
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue("Server connection failed.")
  }
})
