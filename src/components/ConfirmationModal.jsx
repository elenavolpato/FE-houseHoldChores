import { Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { fetchCurrentUserProfile } from "../services/authApi"
import { useAppNavigation } from "../utils/useAppNavigation"

function ConfirmationModal({
  show,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmVariant = "danger",
  isLoading = false,
}) {
  const dispatch = useDispatch()
  const { navigateTo } = useAppNavigation()

  const handleModalConfirm = async () => {
    await dispatch(fetchCurrentUserProfile()).unwrap()
    navigateTo("/new-task")
  }

  return (
    <Modal show={show} onHide={onClose} centered keyboard={!isLoading} backdrop={isLoading ? "static" : true}>
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={confirmText === "Proceed to Tasks" ? handleModalConfirm : onConfirm} disabled={isLoading}>
          {isLoading ? "Processing..." : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
