import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Button } from "react-bootstrap"
import { deleteUserAccount } from "@/services/authApi"

const UserProfileDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      dispatch(deleteUserAccount())
    }
  }

  return (
    <Container className="py-2">
      {/* Display Name */}
      <p className="text-muted small fw-semibold mb-1">Display Name</p>
      <div className="d-flex align-items-center justify-content-between px-3 py-3 mb-4 rounded-3" style={{ background: "#f0f4f8" }}>
        <span className="fw-semibold text-dark fs-5">{user?.username || "—"}</span>
        <i className="fa-regular fa-user text-secondary" />
      </div>

      {/* Card: Email + Group + Role */}
      <div className="bg-white rounded-4 shadow-sm p-3 mb-4">
        {/* Email */}
        <p className="text-muted small fw-semibold mb-1">Email Address</p>
        <div className="d-flex align-items-center justify-content-between px-3 py-2 rounded-3 mb-3" style={{ background: "#f0f4f8" }}>
          <span className="text-secondary">{user?.email || "—"}</span>
          <i className="fa-solid fa-lock text-secondary" style={{ fontSize: 13 }} />
        </div>

        {/* Group + Role */}
        <Row className="g-2">
          <Col xs={6}>
            <div className="rounded-3 p-3" style={{ background: "#e8f4f8" }}>
              <p className="mb-1 small" style={{ color: "#4a8fa8" }}>
                Your Group
              </p>
              <p className="mb-0 fw-bold" style={{ color: "#1a6680" }}>
                {user?.groupName || "No group"}
              </p>
            </div>
          </Col>
          <Col xs={6}>
            <div className="rounded-3 p-3" style={{ background: "#fef9e0" }}>
              <p className="mb-1 small" style={{ color: "#a07c10" }}>
                Role
              </p>
              <p className="mb-0 fw-bold" style={{ color: "#7a5c00" }}>
                {user?.role || "Member"}
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Delete Account */}
      <Button variant="outline-danger" className="w-100 rounded-4 py-3 d-flex align-items-center justify-content-center gap-2" onClick={handleDelete}>
        <i className="fa-regular fa-rectangle-xmark" />
        <span className="fw-semibold">Delete Account</span>
      </Button>
    </Container>
  )
}

export default UserProfileDetails
