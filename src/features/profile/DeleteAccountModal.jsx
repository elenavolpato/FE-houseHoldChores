// components/DeleteAccountModal.jsx
import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserAccount } from "@/services/authApi"

const DeleteAccountModal = ({ show, onHide }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const roommates = useSelector((state) => state.group?.roommates || [])

  const eligibleSuccessors = roommates.filter((r) => r.id !== user?.id)
  const isGroupAdmin = user?.role === "ADMIN" || user?.isOwner === true

  const [selectedSuccessor, setSelectedSuccessor] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [validationError, setValidationError] = useState("")

  const handleConfirm = async () => {
    if (isGroupAdmin && eligibleSuccessors.length > 0 && !selectedSuccessor) {
      setValidationError("Please select a new household administrator before leaving.")
      return
    }

    setIsDeleting(true)
    try {
      await dispatch(deleteUserAccount(selectedSuccessor)).unwrap()
      onHide()
    } catch (err) {
      setValidationError(err || "An error occurred during account deletion.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleHide = () => {
    if (isDeleting) return
    setValidationError("")
    setSelectedSuccessor("")
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title className="text-danger fw-bold">Delete Account Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to permanently delete your profile records? This action cannot be undone.</p>

        {isGroupAdmin && eligibleSuccessors.length > 0 && (
          <div className="alert alert-warning border-0 shadow-sm mt-3">
            <h6 className="fw-bold">
              <i className="bi bi-shield-lock-fill me-2"></i>Pass Admin Responsibilities
            </h6>
            <p className="small text-secondary">
              Since you are the administrator of this household, you must assign someone else to manage chores and invitations before your account can be
              purged.
            </p>
            <Form.Group className="mb-2">
              <Form.Label className="small fw-semibold text-muted">Select New Administrator</Form.Label>
              <Form.Select
                value={selectedSuccessor}
                onChange={(e) => {
                  setValidationError("")
                  setSelectedSuccessor(e.target.value)
                }}
                disabled={isDeleting}
              >
                <option value="">-- Choose Roommate --</option>
                {eligibleSuccessors.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.username} ({member.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        )}

        {isGroupAdmin && eligibleSuccessors.length === 0 && (
          <div className="alert alert-secondary small mt-2">
            <i className="bi bi-info-circle me-1"></i> You are the only person left in this household, so you cannot delete your account. Add another user to
            the group, and try to delete then.
          </div>
        )}

        {validationError && <div className="alert alert-danger py-2 small mt-2">{validationError}</div>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={isDeleting || (isGroupAdmin && eligibleSuccessors.length === 0)}>
          {isDeleting ? "Processing Deletion..." : "Permanently Delete Account"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteAccountModal
