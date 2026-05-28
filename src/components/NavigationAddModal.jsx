import { Modal, Button } from "react-bootstrap"
import { useAppNavigation } from "/src/utils/useAppNavigation.jsx"
import "/src/css/addOptionsModal.css"

function AddOptionsModal({ show, handleClose }) {
  const { navigateTo } = useAppNavigation()

  const handleSelection = (route) => {
    navigateTo(route)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-popup-dialog" contentClassName="custom-popup-content border-0 p-3 rounded-5">
      {/* Dynamic Header Wrapper */}
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark h5 mb-0">Create New Item</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column gap-3 pt-4 pb-3">
        {/* --- OPTION 1: ADD NEW TASK --- */}
        <Button
          variant="none"
          onClick={() => handleSelection("new-task")}
          className="d-flex align-items-center gap-3 p-3 rounded-4 popup-option-btn text-start border bg-white shadow-sm"
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "46px", height: "46px", backgroundColor: "#eef6fa", color: "#0d668f" }}
          >
            <i className="fa-solid fa-clipboard-list fs-5"></i>
          </div>
          <div>
            <h4 className="h6 mb-1 fw-bold text-dark">Add New Task</h4>
            <p className="text-muted small mb-0">Create a custom chore or use household presets</p>
          </div>
        </Button>

        {/* --- OPTION 2: ADD GROCERY ITEM --- */}
        <Button
          variant="none"
          onClick={() => handleSelection("groceries")}
          className="d-flex align-items-center gap-3 p-3 rounded-4 popup-option-btn text-start border bg-white shadow-sm"
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "46px", height: "46px", backgroundColor: "#fff9e6", color: "#ffd700" }}
          >
            <i className="fa-solid fa-basket-shopping fs-5"></i>
          </div>
          <div>
            <h4 className="h6 mb-1 fw-bold text-dark">Add Grocery Item</h4>
            <p className="text-muted small mb-0">Append staples directly to the shared shopping stream</p>
          </div>
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default AddOptionsModal
