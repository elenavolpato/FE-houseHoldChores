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
    selectedCategory: "Pets", // Tracks which category page the user is viewing
    selectedDate: getTodayString(),
    list: [
      {
        id: 1,
        name: "Wash Dishes",
        description: "Keep the sink clear",
        isComplete: false,
        icon: "sink",
        color: "#F1C40F",
        category: "Kitchen",
        date: "2026-05-27",
      },
      {
        id: 2,
        name: "Clean Fridge",
        description: "Check expiration dates",
        isComplete: false,
        icon: "sink",
        color: "#3498DB",
        category: "Kitchen",
        date: "2026-05-27",
      },
      {
        id: 4,
        name: "Empty Trash",
        description: "Take out the recycling too",
        isComplete: false,
        icon: "trash-can",
        color: "#E74C3C",
        category: "Kitchen",
        date: "2026-05-28",
      },
      {
        id: 5,
        name: "Sweep Floor",
        description: "Don't forget the corners",
        isComplete: false,
        icon: "broom",
        color: "#F1C40F",
        category: "Cleaning",
        date: "2026-05-25",
      },
      {
        id: 3,
        name: "Walk dog",
        description: "Around the block",
        isComplete: true,
        icon: "paw",
        color: "#20063B",
        category: "Pets",
        date: "2026-05-27",
      },
      {
        id: 6,
        name: "Mop Living Room",
        description: "Mop",
        isComplete: false,
        icon: "broom",
        color: "#F1C40F",
        category: "Cleaning",
        date: "2026-05-29",
      },
      {
        id: 7,
        name: "Dust Shelves",
        description: "remove all objects from their places",
        isComplete: false,
        icon: "broom",
        color: "#F1C40F",
        category: "Cleaning",
        date: "2026-05-29",
      },
    ],
    groceriesList: [
      { id: 101, name: "Organic Bananas", quantity: "1 bunch", isHighPriority: true, isComplete: false },
      { id: 102, name: "Spinach", quantity: "2 bags", isHighPriority: false, isComplete: false },
      { id: 103, name: "Whole Milk", quantity: "2 Gallons", isHighPriority: false, isComplete: false },
      { id: 104, name: "Sourdough Bread", quantity: "1 Loaf", isHighPriority: false, isComplete: false },
    ],
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

    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSelectedDate: (state, action) => {
      // Expects payload as a sanitized 'YYYY-MM-DD' string format
      state.selectedDate = action.payload
    },
    updateGroupName: (state, action) => {
      // action.payload will be the new name string sent from the input field
      state.groupName = action.payload
    },
  },
})

export const { toggleChore, toggleGrocery, addGrocery, setActiveTab, setSelectedCategory, updateGroupName, setSelectedDate } = choresSlice.actions
export default choresSlice.reducer
