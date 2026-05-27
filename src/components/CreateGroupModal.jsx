import { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateGroupName } from "../redux/choresSlice" // Using your existing group naming action

function CreateGroupModal({ show, handleClose }) {
  const dispatch = useDispatch()
  const [groupNameInput, setGroupNameInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!groupNameInput.trim()) return

    // Dispatch the string name directly to your Redux state
    dispatch(updateGroupName(groupNameInput.trim()))

    // Reset local field and shut down the modal window frame
    setGroupNameInput("")
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-popup-dialog" contentClassName="custom-popup-content border-0 p-3 rounded-5">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark h5 mb-0">Create New Group</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          {/* Main Identifier Input Field */}
          <Form.Group controlId="formGroupName">
            <Form.Label className="fw-semibold text-muted small text-uppercase mb-2">Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Target Trip, Weekend Chores"
              value={groupNameInput}
              onChange={(e) => setGroupNameInput(e.target.value)}
              autoFocus
              required
              className="p-3 rounded-4 bg-light-subtle shadow-sm border-0 input-field-transition"
            />
          </Form.Group>

          {/* Action Submission Trigger */}
          <Button type="submit" className="w-100 create-btn rounded-pill py-3 fw-bold shadow-sm mt-2">
            Create Group
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateGroupModal
