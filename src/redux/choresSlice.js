import { createSlice } from "@reduxjs/toolkit"
import { fetchAvailableTasks, fetchGroupTasks, setChoreCompletionStatus } from "../services/choreApi"

const formatDateString = (dateObj) => {
  const offset = dateObj.getTimezoneOffset()
  const localDate = new Date(dateObj.getTime() - offset * 60 * 1000)
  return localDate.toISOString().split("T")[0]
}

// Centered function to generate the week array based on a target date
const generateWeekData = (targetDateStr) => {
  const today = new Date()
  const formattedToday = formatDateString(today)

  const targetDate = targetDateStr ? new Date(targetDateStr) : today
  const currentDay = targetDate.getDay()

  // Compute steps to get back to Monday
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay
  const monday = new Date(targetDate)
  monday.setDate(targetDate.getDate() + daysToMonday)

  const weekArray = []
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday)
    nextDay.setDate(monday.getDate() + i)

    weekArray.push({
      dayName: dayNames[i],
      dateNumber: nextDay.getDate(),
      isoString: formatDateString(nextDay),
    })
  }

  return {
    daysOfWeek: weekArray,
    todayStr: formattedToday,
    currentMonth: targetDate.toLocaleString("default", { month: "long" }),
    // Week bounds formatted specifically for your Spring Boot LocalDateTime endpoints
    weekStartIso: `${weekArray[0].isoString}T00:00:00`,
    weekEndIso: `${weekArray[6].isoString}T23:59:59`,
  }
}

const initialWeek = generateWeekData()

export const choresSlice = createSlice({
  name: "chores",
  initialState: {
    activeTab: "today",
    selectedCategory: "",
    selectedDate: initialWeek.todayStr,
    daysOfWeek: initialWeek.daysOfWeek,
    todayStr: initialWeek.todayStr,
    currentMonth: initialWeek.currentMonth,
    weekStartIso: initialWeek.weekStartIso,
    weekEndIso: initialWeek.weekEndIso,
    groupName: "",
    list: [],
    groceriesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
      // Automatically recalculate the week layout if they click into a different week boundaries
      const updatedWeek = generateWeekData(action.payload)
      state.daysOfWeek = updatedWeek.daysOfWeek
      state.currentMonth = updatedWeek.currentMonth
      state.weekStartIso = updatedWeek.weekStartIso
      state.weekEndIso = updatedWeek.weekEndIso
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
    updateGroupName: (state, action) => {
      state.groupName = action.payload
    },
    navigateWeek: (state, action) => {
      const direction = action.payload // 1 or -1

      // 1. Always start shifting from the current week's Monday date string
      // state.weekStartIso looks like "2026-06-01T00:00:00" -> split string to get "2026-06-01"
      const currentMondayStr = state.weekStartIso.split("T")[0]
      const currentMonday = new Date(currentMondayStr)

      // 2. Add or subtract exactly 7 days from Monday
      currentMonday.setDate(currentMonday.getDate() + direction * 7)
      const targetMondayStr = currentMonday.toISOString().split("T")[0]

      // 3. Save this target Monday as the active selected date
      state.selectedDate = targetMondayStr

      // 4. Regenerate whole week dataset around it
      const updatedWeek = generateWeekData(targetMondayStr)
      state.daysOfWeek = updatedWeek.daysOfWeek
      state.currentMonth = updatedWeek.currentMonth
      state.weekStartIso = updatedWeek.weekStartIso
      state.weekEndIso = updatedWeek.weekEndIso
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
      .addCase(fetchGroupTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGroupTasks.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchGroupTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(setChoreCompletionStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload
        const index = state.list.findIndex((c) => c.taskId === updatedTask.taskId)

        if (index !== -1) {
          state.list[index].isCompleted = !state.list[index].isCompleted
        }
      })
      .addCase(setChoreCompletionStatus.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { toggleGrocery, addGrocery, addChore, setActiveTab, setSelectedCategory, updateGroupName, setSelectedDate, navigateWeek } = choresSlice.actions
export default choresSlice.reducer
