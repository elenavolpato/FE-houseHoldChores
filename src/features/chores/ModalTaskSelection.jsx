import { useEffect, useState } from "react"
import { Modal, Form, Button, Alert, Row, Col, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createTaskFromPreset } from "@/services/choreApi"
import { getAllGroupMembers } from "@/services/groupApi"
import { assignUserToTask, updateTaskDueDate, updateTaskFrequency } from "../../services/choreApi"

function ModalTaskSelection({ show, handleClose, activeChore, editingTask, onTaskAdded, onTaskUpdated }) {
  const dispatch = useDispatch()
  const isEditMode = Boolean(editingTask)

  // Helper to grab local today date string structure
  const getDateString = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const [dueDate, setDueDate] = useState(getDateString())
  const [groupMembers, setGroupMembers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [frequency, setFrequency] = useState(0)

  useEffect(() => {
    if (!show) return
    if (editingTask) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFrequency(editingTask.frequency)
      console.log("editingTask", editingTask.frequency)
    } else if (activeChore) {
      setFrequency(activeChore.frequency)
      console.log("activeChore", activeChore.frequency)
    }
  }, [show, editingTask, activeChore])

  useEffect(() => {
    if (!show) return
    if (isEditMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDueDate(editingTask.dueDate?.split("T")[0] || getDateString())
    } else {
      setDueDate(getDateString())
      setSelectedUser(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, editingTask])

  useEffect(() => {
    if (!show || !isEditMode) return
    if (!editingTask.userID) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedUser(null)
      return
    }
    const matchedMember = groupMembers.find((m) => String(m.id) === String(editingTask.userID))
    setSelectedUser(matchedMember || null)
  }, [show, isEditMode, editingTask, groupMembers])

  const handleConfirmAdd = async () => {
    setErrorMessage("")
    try {
      if (isEditMode) {
        const newDueDate = dueDate // already just the date portion, e.g. "2026-06-25"
        const newAssignedId = selectedUser ? selectedUser.id : null
        const newFrequency = Number(frequency)

        const originalDueDate = editingTask.dueDate?.split("T")[0] ?? null
        const originalAssignedId = editingTask.userID ?? null
        const originalFrequency = editingTask.frequency

        const dueDateChanged = newDueDate !== originalDueDate
        const assigneeChanged = newAssignedId !== originalAssignedId
        const frequencyChanged = newFrequency !== originalFrequency // 👈

        if (!dueDateChanged && !assigneeChanged && !frequencyChanged) {
          handleClose()
          return
        }

        if (dueDateChanged) {
          await dispatch(updateTaskDueDate({ taskId: editingTask.taskId, dueDate: `${newDueDate}T12:00:00` })).unwrap()
        }

        if (assigneeChanged) {
          await dispatch(assignUserToTask({ taskId: editingTask.taskId, userId: newAssignedId })).unwrap()
        }
        if (frequencyChanged) {
          await dispatch(updateTaskFrequency({ taskId: editingTask.taskId, frequency: newFrequency })).unwrap()
        }

        onTaskUpdated(editingTask.taskId)
      } else {
        if (!activeChore) return
        const payload = {
          presetId: activeChore.id,
          dueDate: `${dueDate}T12:00:00`,
          assignedUserId: selectedUser ? selectedUser.id : null,
          frequency: Number(frequency),
        }
        await dispatch(createTaskFromPreset(payload)).unwrap()
        onTaskAdded(activeChore.id)
      }
      handleClose()
    } catch (err) {
      alert(err || "Something went wrong saving that task.")
    }
  }
  useEffect(() => {
    const getGroupMembers = async () => {
      try {
        setErrorMessage("")
        const data = await dispatch(getAllGroupMembers()).unwrap()
        setGroupMembers(data)
      } catch (err) {
        console.error("Fetch group members failed:", err)
        setErrorMessage(err || "Could not retrieve group members. Do you belong to a household?")
      }
    }
    if (show) {
      getGroupMembers()
    }
  }, [dispatch, show])

  const handleUserSelection = (e) => {
    const selectedId = e.target.value
    const foundUser = groupMembers.find((user) => String(user.id) === String(selectedId))
    //console.log(foundUser)
    setSelectedUser(foundUser || null)
  }

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="border-0 p-2 rounded-4 shadow">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h6 fw-bold text-dark">{isEditMode ? `Edit "${editingTask?.title}"` : `Schedule "${activeChore?.title}"`}</Modal.Title>{" "}
      </Modal.Header>

      <Modal.Body className="pt-3">
        {errorMessage && (
          <Alert variant="danger" className="py-2 px-3 rounded-3 mb-3 small" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
        <Row>
          <Col className="mb-3">
            <Form.Group controlId="popupDueDate">
              <Form.Label className="text-muted small fw-semibold text-uppercase mb-2">Select Due Date</Form.Label>
              <Form.Control
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 rounded-3 bg-light border-0 shadow-sm text-dark"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="text-muted small fw-semibold text-uppercase mb-2">Frequency</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="p-2 rounded-3 bg-light border-0 shadow-sm text-dark"
                  style={{ WebkitAppearance: "none" }}
                  required
                />
                <InputGroup.Text className="p-2 rounded-3 bg-light border-0 shadow-sm text-dark">days</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold text-muted small text-uppercase">Assign To</Form.Label>
          <Form.Select
            value={selectedUser ? selectedUser.id : ""}
            className="p-2 rounded-3 bg-light border-0 shadow-sm text-dark"
            onChange={handleUserSelection}
            required
          >
            <option value="">Assign someone</option>
            {(groupMembers || []).map((member) => (
              <option key={member.id} value={member.id}>
                {member.username}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-2 d-flex gap-2">
        <Button variant="light" className="rounded-pill px-4 fw-semibold text-secondary btn-sm" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="warning" className="rounded-pill px-4 fw-bold text-dark btn-sm shadow-sm" onClick={handleConfirmAdd}>
          {isEditMode ? "Save changes" : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalTaskSelection
