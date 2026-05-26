import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeTab: "today",
  list: [
    { id: 1, name: "Dishwashing", isComplete: false, icon: "sink", color: "#94AE89" },
    { id: 2, name: "Vacuuming", isComplete: false, icon: "broom", color: "#E53D00" },
    { id: 4, name: "Trash removal", isComplete: false, icon: "sink", color: "#E53D00" },
    { id: 3, name: "Walk dog", isComplete: true, icon: "paw", color: "#20063B" },
  ],
}

const choresSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    // Action to toggle chore completion status
    toggleChore: (state, action) => {
      const chore = state.list.find((c) => c.id === action.payload)
      if (chore) {
        chore.isComplete = !chore.isComplete
      }
    },
    // Action to change the global active tab
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { toggleChore, setActiveTab } = choresSlice.actions
export default choresSlice.reducer
