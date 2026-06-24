import { useEffect, useState } from "react"
import { Form, Button, Col, Row, Alert, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import "/src/css/createCustomChore.css"
import { createPersonalizedTask, getAllCategories } from "@/services/choreApi"
import { getAllGroupMembers } from "../../services/groupApi"

function CreateCustomChore() {
  const dispatch = useDispatch()
  const groupMembers = useSelector((state) => state.group.roommates || [])

  // Helper to safely grab tomorrow's date string format (YYYY-MM-DD)
  const getTomorrowDateString = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate())
    return tomorrow.toISOString().split("T")[0]
  }

  const [taskName, setTaskName] = useState("")
  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [customDays, setCustomDays] = useState(2)
  const [assignedMember, setAssignedMember] = useState("")
  const [dueDate, setDueDate] = useState(getTomorrowDateString())

  const [uiError, setUiError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [uiSuccess, setUiSuccess] = useState("")

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await dispatch(getAllCategories()).unwrap()
        // removes groceries until it is implemented
        const removedGroceries = data.filter((cat) => cat.title !== "Groceries")
        setCategories(removedGroceries)
      } catch (err) {
        console.error("Failed to load layout categories:", err)
      }
    }
    loadCategories()
  }, [dispatch])

  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        dispatch(getAllGroupMembers())
      } catch (err) {
        console.error("Fetch group members failed:", err)
      }
    }
    getGroupMembers()
  }, [dispatch])

  const handleCategorySelectionChange = (e) => {
    const selectedTitle = e.target.value
    const foundCategoryObject = categories.find((cat) => cat.title === selectedTitle)
    setSelectedCategory(foundCategoryObject || null)
  }

  const handleCreateChore = async (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    if (!selectedCategory) {
      setUiError("Please specify a category placement type for this chore.")
      return
    }

    setUiError("")
    setUiSuccess("")
    setIsSaving(true)

    const safeDueDate = dueDate ? `${dueDate.split("T")[0]}T23:59:59` : null

    const outboundPayload = {
      taskName: taskName,
      categoryId: selectedCategory.id,
      frequency: customDays,
      assignedTo: assignedMember || null,
      dueDate: safeDueDate,
    }

    try {
      await dispatch(createPersonalizedTask(outboundPayload)).unwrap()

      setUiSuccess("Chore created successfully!")
      setIsSaving(false)
      setTaskName("")
      // Reset date default after submission success
      setDueDate(getTomorrowDateString())
      setTimeout(() => setUiSuccess(""), 4000)
    } catch (err) {
      setUiError(err || "Something went sideways processing that.")
      setIsSaving(false)
    }
  }

  return (
    <Col lg={8} xs={12} className="pb-5">
      <Form onSubmit={handleCreateChore} className="bg-white p-4 rounded-4 shadow-sm border my-5">
        <h3 className="h5 fw-bold text-dark mb-4">Add a custom chore</h3>

        {uiError && (
          <Alert variant="danger" className="py-2 small rounded-3">
            {uiError}
          </Alert>
        )}
        {uiSuccess && (
          <Alert variant="success" className="py-2 small rounded-3 fw-medium">
            {uiSuccess}
          </Alert>
        )}

        {/* Row 1: Task Name & Category */}
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
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted small text-uppercase">Category</Form.Label>
              <Form.Select value={selectedCategory?.title || ""} onChange={handleCategorySelectionChange} className="p-2 rounded-3" required>
                <option value="">Choose a category...</option>
                {(categories || []).map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Row 2: Frequency Interval */}
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted small d-block text-uppercase mb-2">How often?</Form.Label>
              <div className="animate-fade-in p-3 rounded-4 bg-light border border-light-subtle d-flex flex-column gap-1">
                <Form.Label className="fw-semibold text-dark small mb-1">Repeat every </Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <InputGroup>
                    <Form.Control
                      type="number"
                      min="1"
                      max="365"
                      value={customDays}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === "") {
                          setCustomDays("")
                        } else {
                          setCustomDays(Math.max(1, parseInt(val) || 1))
                        }
                      }}
                      onBlur={() => {
                        if (customDays === "" || customDays < 1) setCustomDays(1)
                      }}
                      className="p-2 rounded-3 text-center fw-bold shadow-sm"
                      style={{ WebkitAppearance: "none" }}
                    />
                    <InputGroup.Text className="text-secondary fw-medium">days</InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </Form.Group>
          </Col>
          {/* due date selector */}
          <Col xs={6}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted small d-block text-uppercase mb-2">Start</Form.Label>
              <div className="p-3 rounded-4 bg-light border border-light-subtle d-flex flex-column gap-1">
                <Form.Label className="fw-semibold text-dark small mb-1">Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  min={new Date().toISOString().split("T")[0]} // Prevents manually selecting past days in the calendar UI
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 rounded-3 shadow-sm bg-white text-dark"
                  required
                />
              </div>
            </Form.Group>
          </Col>

          {/* Row 3: Assign to someone */}
          <Col xs={12}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-muted small d-block text-uppercase mb-2">Assign task</Form.Label>
              <div className="p-3 rounded-4 bg-light border border-light-subtle d-flex flex-column gap-1">
                <Form.Label className="fw-semibold text-dark small mb-1">Select Roommate</Form.Label>
                <Form.Select value={assignedMember} onChange={(e) => setAssignedMember(e.target.value)} className="p-2 rounded-3 shadow-sm bg-white">
                  <option value="">Leave Unassigned</option>
                  {groupMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.username}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" disabled={isSaving} className="w-100 add-action-circle-btn py-2 rounded-3 fw-bold mt-2">
          {isSaving ? "Saving Chore..." : "Save Custom Chore"}
        </Button>
      </Form>
    </Col>
  )
}

export default CreateCustomChore
