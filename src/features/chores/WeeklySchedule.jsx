import { Row, Col, Badge, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate } from "/src/redux/choresSlice"
import "/src/css/weeklySchedule.css"
import { navigateWeek } from "../../redux/choresSlice"

const WeeklySchedule = () => {
  const dispatch = useDispatch()

  // 1. Pull everything straight from Redux global state layout
  const selectedDateStr = useSelector((state) => state.chores.selectedDate)
  const daysOfWeek = useSelector((state) => state.chores.daysOfWeek)
  const todayStr = useSelector((state) => state.chores.todayStr)
  const currentMonth = useSelector((state) => state.chores.currentMonth)

  const handleDaySelect = (isoString) => {
    dispatch(setSelectedDate(isoString))
  }

  return (
    <Col md={8} xs={12}>
      <div className="schedule-card position-relative">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0 text-dark">Weekly Schedule</h4>
          {/* Navigation Controls Wrapper */}
          <div className="d-flex align-items-center gap-2">
            <Badge bg="none" className="month-badge px-3 py-2 fs-6 text-capitalize border text-dark">
              {currentMonth}
            </Badge>
          </div>
          <Button
            variant="link"
            className="text-dark p-1 link-underline-opacity-0 position-absolute arrow-btn-left"
            onClick={() => dispatch(navigateWeek(-1))}
            title="Previous Week"
          >
            <i className="fa-solid fa-chevron-left fs-5"></i>
          </Button>
          <Button
            variant="link"
            className="text-dark p-1 link-underline-opacity-0 position-absolute arrow-btn-right"
            onClick={() => dispatch(navigateWeek(1))}
            title="Next Week"
          >
            <i className="fa-solid fa-chevron-right fs-5"></i>
          </Button>
        </div>

        {/* 7 Days Grid Ribbon Layout */}
        <Row className="g-1 justify-content-between mb-4 mx-0 flex-nowrap overflow-visible position-relative">
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
                style={{ cursor: "pointer" }}
              >
                <span className={`text-muted small ${isSelected || isToday ? "fw-bold text-dark" : ""}`}>{item.dayName}</span>
                <span className="fs-4 fw-bold my-1 text-dark">{item.dateNumber}</span>
                <div>
                  <i className="fa-solid fa-circle indicator-dot" style={{ opacity: isToday ? 1 : 0 }}></i>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </Col>
  )
}

export default WeeklySchedule
