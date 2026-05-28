import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createTaskFromPreset } from "../services/taskApi"

function ModalDueDateSelection({ show, handleClose, activeChore, onTaskAdded }) {
  const dispatch = useDispatch()

  // Helper to grab local today date string structure
  const getTodayDateString = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const [dueDate, setDueDate] = useState(getTodayDateString())

  const handleConfirmAdd = async () => {
    if (!activeChore) return

    try {
      const payload = {
        presetId: activeChore.id,
        dueDate: `${dueDate}T12:00:00`,
      }

      await dispatch(createTaskFromPreset(payload)).unwrap()

      onTaskAdded(activeChore.id)
      handleClose()
    } catch (err) {
      alert(err || "Something went wrong activating that chore configuration.")
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="border-0 p-2 rounded-4 shadow">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="h6 fw-bold text-dark">Schedule "{activeChore?.title}"</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3">
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

export default ModalDueDateSelection
