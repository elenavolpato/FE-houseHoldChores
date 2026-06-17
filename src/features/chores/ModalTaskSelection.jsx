import { useEffect, useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createTaskFromPreset } from "@/services/choreApi"
import { getAllGroupMembers } from "@/services/groupApi"

function ModalTaskSelection({ show, handleClose, activeChore, onTaskAdded }) {
  const dispatch = useDispatch()

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

  const handleConfirmAdd = async () => {
    if (!activeChore) return
    setErrorMessage("")

    try {
      const payload = {
        presetId: activeChore.id,
        dueDate: `${dueDate}T12:00:00`,
        assignedTo: selectedUser ? selectedUser.id : null,
      }

      await dispatch(createTaskFromPreset(payload)).unwrap()

      onTaskAdded(activeChore.id)
      handleClose()
    } catch (err) {
      alert(err || "Something went wrong activating that chore configuration.")
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
        <Modal.Title className="h6 fw-bold text-dark">Schedule "{activeChore?.title}"</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {errorMessage && (
          <Alert variant="danger" className="py-2 px-3 rounded-3 mb-3 small" onClose={() => setErrorMessage("")} dismissible>
            {errorMessage}
          </Alert>
        )}
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
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalTaskSelection
