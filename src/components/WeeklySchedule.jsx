import { useState, useEffect } from "react"
import { Container, Row, Col, Badge, ButtonGroup, Button } from "react-bootstrap"
// Import your custom CSS file here
import "../css/weeklySchedule.css"

const FullWeeklySchedule = () => {
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState("")
  const [viewMode, setViewMode] = useState("daily")
  const [todayNumber, setTodayNumber] = useState(null)

  useEffect(() => {
    const generateFullWeek = () => {
      const today = new Date()
      const currentDay = today.getDay()
      const actualTodayDate = today.getDate()

      setTodayNumber(actualTodayDate)
      setSelectedDate(actualTodayDate)

      const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay

      const monday = new Date(today)
      monday.setDate(today.getDate() + daysToMonday)

      const weekArray = []
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

      // Loop 7 times to include Saturday and Sunday
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(monday)
        nextDay.setDate(monday.getDate() + i)

        weekArray.push({
          dayName: dayNames[i],
          dateNumber: nextDay.getDate(),
        })
      }

      setDaysOfWeek(weekArray)
      setSelectedDate(today.getDate())

      // Fetch dynamic month string
      const monthName = today.toLocaleString("default", { month: "long" })
      setCurrentMonth(monthName)
    }

    generateFullWeek()
  }, [])

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="schedule-card">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0 text-dark">Weekly Schedule</h4>
          <Badge bg="none" className="month-badge px-3 py-2 fs-6 text-capitalize">
            {currentMonth}
          </Badge>
        </div>

        {/* Days Grid */}
        <Row className="g-1 justify-content-between mb-4 mx-0 flex-nowrap overflow-visible">
          {daysOfWeek.map((item) => {
            const isSelected = selectedDate === item.dateNumber
            const isToday = todayNumber === item.dateNumber

            return (
              <Col
                key={item.dateNumber}
                className={`day-col text-center p-2 d-flex flex-column align-items-center justify-content-between 
                  ${isSelected ? "selected" : ""} 
                  ${isToday ? "is-today" : ""}`}
                onClick={() => setSelectedDate(item.dateNumber)}
              >
                <span className={`text-muted small ${isSelected || isToday ? "fw-bold text-dark" : ""}`}>{item.dayName}</span>
                <span className="fs-4 fw-bold my-1 text-dark">{item.dateNumber}</span>
                <div>
                  {/* The indicator dot remains firmly tied to 'isToday' status */}
                  <i className="fa-solid fa-circle indicator-dot" style={{ opacity: isToday ? 1 : 0 }}></i>
                </div>
              </Col>
            )
          })}
        </Row>

        {/* View Switcher Toggle */}
        {/* <div className="d-flex align-items-center justify-content-center toggle-container">
          <ButtonGroup className="w-100">
            <Button className={`toggle-btn ${viewMode === "daily" ? "active" : "inactive"}`} onClick={() => setViewMode("daily")}>
              Daily View
            </Button>
            <Button className={`toggle-btn ${viewMode === "weekly" ? "active" : "inactive"}`} onClick={() => setViewMode("weekly")}>
              Weekly Grid
            </Button>
          </ButtonGroup>
        </div> */}
      </div>
    </Container>
  )
}

export default FullWeeklySchedule
