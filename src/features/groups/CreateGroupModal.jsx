import { useState } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap" // 👈 Imported Alert cleanly
import { useDispatch } from "react-redux"
import { createGroup } from "@/services/groupApi"
import { useAppNavigation } from "@/utils/useAppNavigation"

function CreateGroupModal({ show, handleClose }) {
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState("")
  const { navigateTo } = useAppNavigation()

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    setError("")

    try {
      const result = await dispatch(createGroup(groupName)).unwrap()

      alert("Household created successfully!")
      setGroupName("")
      handleClose()
      navigateTo("groups")
    } catch (backendError) {
      setError(backendError || "Failed to create group.")
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-popup-dialog" contentClassName="custom-popup-content border-0 p-3 rounded-5">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark h5 mb-0">Create a new household</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        {error && (
          <Alert variant="danger" className="py-2 px-3 rounded-3 mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <Form.Group controlId="formGroupName">
            <Form.Label className="fw-semibold text-muted small text-uppercase mb-2">Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="p-3 rounded-4 bg-light-subtle shadow-sm border-0 input-field-transition"
            />
          </Form.Group>

          <Button type="submit" className="w-100 create-btn rounded-pill py-3 fw-bold shadow-sm mt-2">
            Create Group
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateGroupModal
