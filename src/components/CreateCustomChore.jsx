import { useState } from "react"
import { Form, Button, ButtonGroup, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import "../css/createCustomChore.css"
import { addChore } from "../redux/choresSlice"

function CreateCustomChore() {
  const dispatch = useDispatch()

  // Basic Input States
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Cleaning")
  const [customDays, setCustomDays] = useState(2)

  // Custom Frequency Controls
  const [timeMode, setTimeMode] = useState("daily") // 'daily' or 'weekly'
  const [selectedDays, setSelectedDays] = useState([]) // holds picked multiple days numbers: e.g., ['Mon', 'Wed']

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }
  const currentSelectedDate = useSelector((state) => state.chores.selectedDate)

  const handleCreateChore = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return

    const newChorePayload = {
      id: Date.now(),
      name: taskName,
      description: description,
      category: category,
      icon: "clipboard-list",
      color: category === "Kitchen" ? "#3498DB" : category === "Pets" ? "#20063B" : "#F1C40F", // Dynamic color matching
      timeMode: timeMode,
      frequencyDays: timeMode === "weekly" ? selectedDays : null,
      customInterval: timeMode === "custom" ? customDays : null,
      date: currentSelectedDate,
    }

    // Dispatch the clean payload directly to Redux
    dispatch(addChore(newChorePayload))

    // Reset form inputs completely
    setTaskName("")
    setDescription("")
    setSelectedDays([])
    setCustomDays(2)
  }

  return (
    <Col md={8} xs={12}>
      <Form onSubmit={handleCreateChore} className="bg-white p-4 rounded-4 shadow-sm border my-5">
        <h3 className="h5 fw-bold text-dark mb-4">Custom Parameters</h3>

        {/* Title input */}
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold text-muted small text-uppercase">Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Clean Balcony Windows"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="p-2 rounded-3"
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            {/* Category selection */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted small text-uppercase">Category Placement</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded-3">
                <option value="Cleaning">Cleaning</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Pets">Pets</option>
              </Form.Select>
            </Form.Group>{" "}
          </Col>
        </Row>
        {/* Description input */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold text-muted small text-uppercase">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Add specifications here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-3"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold text-muted small d-block text-uppercase mb-2">Scope Schedule</Form.Label>

          {/* Updated Toggle ButtonGroup to support 3 options */}
          <ButtonGroup className="w-100 toggle-container p-1 mb-3" style={{ height: "45px" }}>
            <Button className={`toggle-btn ${timeMode === "daily" ? "active" : "inactive"}`} onClick={() => setTimeMode("daily")}>
              Daily Cadence
            </Button>
            <Button className={`toggle-btn ${timeMode === "weekly" ? "active" : "inactive"}`} onClick={() => setTimeMode("weekly")}>
              Weekly Scope
            </Button>
            <Button className={`toggle-btn ${timeMode === "custom" ? "active" : "inactive"}`} onClick={() => setTimeMode("custom")}>
              Custom Days
            </Button>
          </ButtonGroup>

          {/* Multi-Day Frequency Customizer (Shows when Weekly is selected) */}
          {timeMode === "weekly" && (
            <div className="mb-2 animate-fade-in">
              <Form.Label className="fw-semibold text-muted small d-block text-uppercase mb-2">Repeat Frequency (Select more days)</Form.Label>
              <div className="d-flex justify-content-between gap-1 flex-wrap">
                {weekdays.map((day) => {
                  const active = selectedDays.includes(day)
                  return (
                    <Button
                      key={day}
                      type="button"
                      variant="none"
                      className={`rounded-circle p-0 d-flex align-items-center justify-content-center frequency-bubble-day ${active ? "active" : ""}`}
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => handleDayToggle(day)}
                    >
                      {day.substring(0, 2)}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Numeric Interval Input (Shows when Custom is selected) */}
          {timeMode === "custom" && (
            <div className="animate-fade-in p-3 rounded-4 bg-light border border-light-subtle">
              <Form.Label className="fw-semibold text-dark small mb-2">Repeat every X days</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Control
                  type="number"
                  min="1"
                  max="365"
                  value={customDays}
                  onChange={(e) => setCustomDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="p-2 rounded-3 text-center fw-bold shadow-sm"
                  style={{ width: "100px" }}
                />
                <span className="text-secondary fw-medium">days</span>
              </div>
            </div>
          )}
        </Form.Group>

        {/* Submit Action */}
        <Button type="submit" className="w-100 add-action-circle-btn py-2 rounded-3 fw-bold mt-2">
          Save Custom Chore
        </Button>
      </Form>
    </Col>
  )
}

export default CreateCustomChore
