import { Container, Dropdown, Modal, Form, Button } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { useAppNavigation } from "../utils/useAppNavigation"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn, logout } from "@/redux/authSlice"
import { useEffect, useState } from "react"
import { deleteUserAccount } from "../services/authApi"
import { getAllGroupMembers } from "../services/groupApi"

function TopBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const navigateTo = useAppNavigation()

  const roommates = useSelector((state) => state.group?.roommates || [])
  console.log(roommates)

  const eligibleSuccessors = roommates.filter((r) => r.id !== user?.id)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSuccessor, setSelectedSuccessor] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [validationError, setValidationError] = useState("")

  const isGroupAdmin = user?.role === "ADMIN" || user?.isOwner === true

  const handleDeleteTrigger = () => {
    setValidationError("")
    setSelectedSuccessor("")
    setShowDeleteModal(true)
  }

  const handleConfirmDeletion = async () => {
    if (isGroupAdmin && eligibleSuccessors.length > 0 && !selectedSuccessor) {
      setValidationError("Please select a new household administrator before leaving.")
      return
    }

    setIsDeleting(true)
    try {
      await dispatch(deleteUserAccount(selectedSuccessor)).unwrap()
      setShowDeleteModal(false)
    } catch (err) {
      setValidationError(err || "An error occurred during account deletion.")
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllGroupMembers())
    }
  }, [dispatch, isLoggedIn])
  console.log(roommates)

  const showAuthButtons = !isLoggedIn && location.pathname !== "/login" && location.pathname !== "/register"

  return (
    <>
      <Container fluid className="p-3 bg-white shadow-lg border-top d-flex justify-content-between align-items-center">
        <h1 className="text-light-navy m-0 d-flex align-items-center fs-3 cursor-pointer" onClick={() => navigateTo(isLoggedIn ? "home" : " ")}>
          <i className="bi bi-house-check me-2"></i>
          <span className="d-md-inline d-none fw-bold ">ChoreMate</span>
        </h1>

        <div className="d-none d-lg-block z-3">
          <NavigationBar variant="desktop" />
        </div>

        {showAuthButtons && (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium" onClick={() => navigateTo("login")}>
              Login
            </button>
            <button className="btn btn-warning px-3 rounded-pill fw-medium" style={{ backgroundColor: "#F1C40F" }} onClick={() => navigateTo("register")}>
              Register
            </button>
          </div>
        )}

        {isLoggedIn && (
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="d-flex align-items-center gap-1 cursor-pointer border rounded-pill px-3 py-1 bg-light shadow-sm">
              <img src={user?.avatarUrl} alt="avatar" className="rounded-circle" style={{ width: "32px", height: "32px" }} />
              <span className="fw-medium text-secondary m-1">{user?.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow border-0 mt-2 p-2">
              <Dropdown.Item onClick={handleDeleteTrigger} className="text-danger fw-medium">
                <i className="bi bi-trash-fill me-2"></i> Delete Account
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => dispatch(logout())}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>

      {/* 🚀 HANDOVER AND CONFIRMATION MODAL */}
      <Modal show={showDeleteModal} onHide={() => !isDeleting && setShowDeleteModal(false)} centered>
        <Modal.Header closeButton={!isDeleting}>
          <Modal.Title className="text-danger fw-bold">Delete Account Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to permanently delete your profile records? This action cannot be undone.</p>

          {/* ⚡ Case 1: User is admin and has roommates to transfer to */}
          {isGroupAdmin && eligibleSuccessors.length > 0 && (
            <div className="alert alert-warning border-0 shadow-sm mt-3">
              <h6 className="fw-bold text-dark-navy">
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

          {/* ⚡ Case 2: User is admin but they are the absolute last person left in the group */}
          {isGroupAdmin && eligibleSuccessors.length === 0 && (
            <div className="alert alert-secondary small mt-2">
              <i className="bi bi-info-circle me-1"></i> You are the only person left in this household. The group record will be fully closed upon deletion.
            </div>
          )}

          {validationError && <div className="alert alert-danger py-2 small mt-2">{validationError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDeletion} disabled={isDeleting}>
            {isDeleting ? "Processing Deletion..." : "Permanently Delete Account"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TopBar
