import { useState } from "react"
import { Form, Alert, Container, InputGroup, Col } from "react-bootstrap"
import { createGroup } from "@/services/groupApi"
import { useAppNavigation } from "@/utils/useAppNavigation"
import { useDispatch } from "react-redux"
import ConfirmationModal from "../../components/ConfirmationModal"
//import { fetchCurrentUserProfile } from "../../services/authApi"

function CreateGroupName() {
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { navigateTo } = useAppNavigation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await dispatch(createGroup(groupName)).unwrap()
      setGroupName("")
      setShowModal(true) // Open the modal on success instead of alert
    } catch (backendError) {
      setError(backendError || "Failed to create group.")
    } finally {
      setIsSubmitting(false)
      //navigateTo("/new-task")
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    navigateTo("new-task") // Navigate away when they close or confirm the modal
  }

  return (
    <Container className="mt-3">
      {error && (
        <Alert variant="danger" className="py-2 px-3 rounded-3 mb-3">
          {error}{" "}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="d-flex gap-2 ">
        <Col xs={8}>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          </InputGroup>
        </Col>
        <Col xs={4}>
          <button className="btn btn-warning px-3 rounded-pill fw-medium" type="submit" disabled={isSubmitting}>
            Create Group
          </button>
        </Col>
      </Form>
      <ConfirmationModal
        show={showModal}
        onClose={handleModalClose}
        onConfirm={handleModalClose} // Both buttons take user to next step
        title="Success!"
        message="Household created successfully!"
        confirmText="Proceed to Tasks"
        confirmVariant="success"
      />
    </Container>
  )
}

export default CreateGroupName
