import { /* createAsyncThunk, */ createSlice } from "@reduxjs/toolkit"

/* 
export const fetchCategories = createAsyncThunk(
  'chores/fetchCategories',
  async () => {
    // Replace with your real backend endpoint
    const response = await fetch('https://localhost:3000/chores/categories')
    const data = await response.json()
    
    // Format the backend "Key": [desc, icon, color] structure into clean objects
    return Object.keys(data).map(key => ({
      name: key,
      desc: data[key][0],
      icon: data[key][1],
      color: data[key][2].trim()
    }))
  }
) */

export const choresSlice = createSlice({
  name: "chores",
  initialState: {
    activeTab: "today",
    selectedCategory: "Pets", // Tracks which category page the user is viewing
    list: [
      { id: 1, name: "Wash Dishes", description: "Keep the sink clear", isComplete: false, icon: "sink", color: "#F1C40F", category: "Kitchen" },
      { id: 2, name: "Clean Fridge", description: "Check expiration dates", isComplete: false, icon: "sink", color: "#3498DB", category: "Kitchen" },
      { id: 4, name: "Empty Trash", description: "Take out the recycling too", isComplete: false, icon: "trash-can", color: "#E74C3C", category: "Kitchen" },
      { id: 5, name: "Sweep Floor", description: "Don't forget the corners", isComplete: false, icon: "broom", color: "#F1C40F", category: "Cleaning" },
      { id: 3, name: "Walk dog", description: "Around the block", isComplete: true, icon: "paw", color: "#20063B", category: "Pets" },
      { id: 6, name: "Mop Living Room", description: "Mop", isComplete: false, icon: "broom", color: "#F1C40F", category: "Cleaning" },
      {
        id: 7,
        name: "Dust Shelves",
        description: "remove all objects from their places",
        isComplete: false,
        icon: "broom",
        color: "#F1C40F",
        category: "Cleaning",
      },
    ],
  },
  reducers: {
    toggleChore: (state, action) => {
      const chore = state.list.find((c) => c.id === action.payload)
      if (chore) {
        chore.isComplete = !chore.isComplete
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    updateGroupName: (state, action) => {
      // action.payload will be the new name string sent from the input field
      state.groupName = action.payload
    },
  },
})

export const { toggleChore, setActiveTab, setSelectedCategory, updateGroupName } = choresSlice.actions
export default choresSlice.reducer
