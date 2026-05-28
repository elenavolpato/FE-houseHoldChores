import { useState, useEffect } from "react"
import { Row, Col, Badge /* , ButtonGroup, Button  */ } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate /*  setActiveTab */ } from "/src/redux/choresSlice"
import "/src/css/weeklySchedule.css"

const WeeklySchedule = () => {
  const dispatch = useDispatch()

  // 1. Grab global states from Redux
  const selectedDateStr = useSelector((state) => state.chores.selectedDate)
  //const activeTab = useSelector((state) => state.chores.activeTab)

  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [todayStr, setTodayStr] = useState("")
  const [currentMonth, setCurrentMonth] = useState("")

  const formatDateString = (dateObj) => {
    const offset = dateObj.getTimezoneOffset()
    const localDate = new Date(dateObj.getTime() - offset * 60 * 1000)
    return localDate.toISOString().split("T")[0]
  }

  useEffect(() => {
    const generateFullWeek = () => {
      const today = new Date()
      const currentDay = today.getDay()
      const formattedToday = formatDateString(today)

      setTodayStr(formattedToday)

      // Compute how many days to subtract to go back to Monday
      const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay
      const monday = new Date(today)
      monday.setDate(today.getDate() + daysToMonday)

      const weekArray = []
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

      // Loop 7 times for a complete Mon - Sun week structure
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(monday)
        nextDay.setDate(monday.getDate() + i)

        weekArray.push({
          dayName: dayNames[i],
          dateNumber: nextDay.getDate(),
          isoString: formatDateString(nextDay),
        })
      }

      setDaysOfWeek(weekArray)
      setCurrentMonth(today.toLocaleString("default", { month: "long" }))
    }

    generateFullWeek()
  }, [])

  const handleDaySelect = (isoString) => {
    dispatch(setSelectedDate(isoString))
  }

  return (
    <Col md={8} xs={12}>
      <div className="schedule-card">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0 text-dark">Weekly Schedule</h4>
          <Badge bg="none" className="month-badge px-3 py-2 fs-6 text-capitalize">
            {currentMonth}
          </Badge>
        </div>

        {/* 7 Days Grid Ribbon Layout */}
        <Row className="g-1 justify-content-between mb-4 mx-0 flex-nowrap overflow-visible">
          {daysOfWeek.map((item) => {
            const isSelected = selectedDateStr === item.isoString
            const isToday = todayStr === item.isoString

            return (
              <Col
                key={item.isoString}
                className={`day-col text-center p-2 d-flex flex-column align-items-center justify-content-between 
                  ${isSelected ? "selected" : ""} 
                  ${isToday ? "is-today" : ""}`}
                onClick={() => handleDaySelect(item.isoString)}
              >
                <span className={`text-muted small ${isSelected || isToday ? "fw-bold text-dark" : ""}`}>{item.dayName}</span>
                <span className="fs-4 fw-bold my-1 text-dark">{item.dateNumber}</span>
                <div>
                  {/* The dot is explicitly linked to 'isToday' so it never jumps with clicks */}
                  <i className="fa-solid fa-circle indicator-dot" style={{ opacity: isToday ? 1 : 0 }}></i>
                </div>
              </Col>
            )
          })}
        </Row>

        {/* Bottom Toggle View Switcher */}
        {/* <div className="d-flex align-items-center justify-content-center toggle-container">
          <ButtonGroup className="w-100">
            <Button className={`toggle-btn ${activeTab === "today" ? "active" : "inactive"}`} onClick={() => dispatch(setActiveTab("today"))}>
              Daily View
            </Button>
            <Button className={`toggle-btn ${activeTab === "weekly" ? "active" : "inactive"}`} onClick={() => dispatch(setActiveTab("weekly"))}>
              Weekly Grid
            </Button>
          </ButtonGroup>
        </div> */}
      </div>
    </Col>
  )
}

export default WeeklySchedule
