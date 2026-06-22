import { createAsyncThunk } from "@reduxjs/toolkit"
import API_BASE_URL from "@/api"

export const fetchAvailableTasks = createAsyncThunk("tasks/fetchAvailableTasks", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token
    if (!token) {
      return thunkAPI.rejectedWithValue("No authentication token found")
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/presets`, {
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
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection failed")
  }
})

export const fetchGroupTasks = createAsyncThunk("tasks/fetchGroupTasks", async ({ startDate, endDate }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token
    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token found")
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/group/week?start=${startDate}&end=${endDate}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
    const data = await response.json()
    //console.log("fetchGroupTasks", data)

    if (!response.ok) {
      return thunkAPI.rejectedWithValue(data.message || "Failed to load group tasks.")
    }
    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection failed")
  }
})

export const createTaskFromPreset = createAsyncThunk("task/createTaskFromPreset", async ({ presetId, dueDate, assignedTo, frequency }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    // Look up current user details directly from the logged-in auth state container
    const currentGroupId = state.auth.user?.groupId

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    if (!currentGroupId) {
      return thunkAPI.rejectWithValue("You must join or create a household group before scheduling chores.")
    }

    const requestBody = {
      presetId: presetId,
      assignedUserId: assignedTo ?? null,
      groupId: currentGroupId,
      dueDate: dueDate,
      frequency: frequency,
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/create-from-preset`, {
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
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
  }
})

export const getAllCategories = createAsyncThunk("task/getAllCategories", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to fetch task categories.")
    }
    return data // List<CategoryResponseDTO>
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection lost. Could not load categories.")
  }
})

export const createPersonalizedTask = createAsyncThunk(
  "task/createPersonalizedTask",
  async ({ taskName, categoryId, dueDate, frequency, assignedTo }, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const token = state.auth.token

      const currentGroupId = thunkAPI.getState().auth.user?.groupId

      if (!token) {
        return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
      }

      if (!currentGroupId) {
        return thunkAPI.rejectWithValue("You must join or create a household group before scheduling chores.")
      }

      const requestBody = {
        title: taskName,
        categoryId: categoryId,
        groupId: currentGroupId,
        dueDate: dueDate,
        frequency: frequency,
        assignedUserId: assignedTo || null,
      }

      const response = await fetch(`${API_BASE_URL}/api/tasks/create-task`, {
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
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
    }
  },
)

export const setChoreCompletionStatus = createAsyncThunk("tasks/setChoreCompletionStatus", async (choreId, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    // Find the specific chore in your state to get its current status
    const chore = state.chores.list.find((c) => c.taskId === choreId)
    if (!chore) {
      return thunkAPI.rejectWithValue("Chore not found in local state")
    }

    // Flip the status for the backend payload
    const updatedStatus = !chore.isCompleted

    const response = await fetch(`${API_BASE_URL}/api/tasks/${choreId}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: updatedStatus }),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to update chore status.")
    }

    // Return the updated task object from the backend
    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connection failed")
  }
})

export const assignUserToTask = createAsyncThunk("task/assignUserToTask", async ({ taskId, userId }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    const requestBody = {
      userId: userId,
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/assign`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to assign user to task.")
    }

    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
  }
})

export const updateTaskDueDate = createAsyncThunk("task/updateTaskDueDate", async ({ taskId, dueDate }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    const requestBody = {
      dueDate: dueDate,
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/due-date`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to update due date.")
    }

    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
  }
})

export const updateTaskFrequency = createAsyncThunk("task/updateTaskFrequency", async ({ taskId, frequency, customInterval }, thunkAPI) => {
  try {
    const state = thunkAPI.getState()
    const token = state.auth.token

    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token missing. Please log in again.")
    }

    const requestBody = {
      frequency: frequency,
      customInterval: customInterval ?? null,
    }

    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/frequency`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Failed to update frequency.")
    }

    return data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue("Server connectivity lost. Please try again shortly.")
  }
})
