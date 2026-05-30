import { Modal, Button } from "react-bootstrap"

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
        <Button variant={confirmVariant} onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Processing..." : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal

/* const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "",
    message: "",
    confirmText: "",
    confirmVariant: "primary",
    action: null, // Stores the function execution closure
  });

  const handleCloseModal = () => {
    if (isActionLoading) return; // Prevent closing while processing an API call
    setModalConfig((prev) => ({ ...prev, show: false }));
  };

  // 1️⃣ Trigger Configuration: For Sending Invites
  const triggerInviteConfirm = (emailPayload) => {
    setModalConfig({
      show: true,
      title: "Send Household Invitation",
      message: `Are you sure you want to email a secure registration link to ${emailPayload.recipientEmail}?`,
      confirmText: "Send Invitation",
      confirmVariant: "success",
      action: () => executeInvitation(emailPayload),
    });
  }; */
