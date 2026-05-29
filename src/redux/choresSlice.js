import { createSlice } from "@reduxjs/toolkit"
import { fetchAvailableTasks } from "../services/taskApi"

const getTodayString = () => {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  const localDate = new Date(today.getTime() - offset * 60 * 1000)
  return localDate.toISOString().split("T")[0]
}

export const choresSlice = createSlice({
  name: "chores",
  initialState: {
    activeTab: "today",
    selectedCategory: "",
    selectedDate: getTodayString(),
    groupName: "Casa da Baunilha",
    list: [],
    groceriesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleChore: (state, action) => {
      const chore = state.list.find((c) => c.id === action.payload)
      if (chore) {
        chore.isComplete = !chore.isComplete
      }
    },
    toggleGrocery: (state, action) => {
      const item = state.groceriesList.find((g) => g.id === action.payload)
      if (item) {
        item.isComplete = !item.isComplete
      }
    },
    addGrocery: (state, action) => {
      // action.payload can be a string name
      state.groceriesList.push({
        id: Date.now(),
        name: action.payload,
        quantity: "1 unit",
        isComplete: false,
      })
    },
    addChore: (state, action) => {
      state.list.push({
        id: action.payload.id || Date.now(), // Fallback unique ID generation
        name: action.payload.name,
        description: action.payload.description,
        category: action.payload.category,
        isComplete: false, // Always defaults to false for new items
        icon: action.payload.icon || "clipboard-list",
        color: action.payload.color || "#1c668c",
        timeMode: action.payload.timeMode,
        frequencyDays: action.payload.frequencyDays,
        customInterval: action.payload.customInterval,
        // Ensure it initializes with a date string format so ChoresStatus component filters it perfectly!
        date: action.payload.date,
      })
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    updateGroupName: (state, action) => {
      state.groupName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAvailableTasks.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchAvailableTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { toggleChore, toggleGrocery, addGrocery, addChore, setActiveTab, setSelectedCategory, updateGroupName, setSelectedDate } = choresSlice.actions
export default choresSlice.reducer
