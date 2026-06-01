import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import DeleteAccountModal from "./DeleteAccountModal"
import { useState, useEffect } from "react"
import { updateGroupNameApi } from "../../services/groupApi"
import { updateGroupName } from "../../redux/groupSlice"

const UserProfileDetails = () => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingGroup, setIsEditingGroup] = useState(false)

  const reduxGroupName = useSelector((state) => state.group.groupName)
  console.log(reduxGroupName)
  const safeGroupName = reduxGroupName || "My Household"
  const [usernameInput, setUsernameInput] = useState(safeGroupName)
  const [groupNameInput, setGroupNameInput] = useState("")

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsernameInput(user.username || "")
      setGroupNameInput(safeGroupName)
    }
  }, [safeGroupName, user])

  const executeUsernameUpdate = async (e) => {
    e.preventDefault()
    // if nothing changes, just close the editor without sending anything to the server
    if (!usernameInput.trim() || usernameInput === user?.username) {
      setIsEditingUsername(false)
      return
    }

    setIsSaving(true)
    try {
      setIsEditingUsername(false)
    } catch (err) {
      console.error("Failed to update username:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const executeGroupUpdate = async (e) => {
    e.preventDefault()
    const originalGroupName = safeGroupName
    setIsEditingGroup(true)

    if (!groupNameInput.trim() || groupNameInput === originalGroupName) {
      setIsEditingGroup(false)
      return
    }

    if (!user?.groupId) {
      console.error("No groupId found on user profile")
      return
    }

    setIsSaving(true)
    try {
      await dispatch(
        updateGroupNameApi({
          groupId: user.groupId,
          newGroupName: groupNameInput.trim(),
        }),
      ).unwrap()
      // update name in store
      dispatch(updateGroupName(groupNameInput.trim()))

      setIsEditingGroup(false)
    } catch (err) {
      console.error("Failed to update group name:", err)
      setGroupNameInput(safeGroupName)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Container className="py-2">
        {/* --- DISPLAY NAME SECTION --- */}
        <p className="text-muted small fw-semibold mb-1">Display Name</p>

        {isEditingUsername ? (
          <Form onSubmit={executeUsernameUpdate} className="d-flex gap-2 mb-4">
            <Form.Control
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="fs-5 fw-semibold px-3 py-2 rounded-3"
              disabled={isSaving}
              required
              autoFocus
            />
            <Button variant="success" type="submit" className="rounded-3 px-3" disabled={isSaving}>
              {isSaving ? "..." : "Save"}
            </Button>
            <Button
              variant="light"
              onClick={() => {
                setIsEditingUsername(false)
                setUsernameInput(user?.username || "")
              }}
              className="rounded-3"
              disabled={isSaving}
            >
              Cancel
            </Button>
          </Form>
        ) : (
          <div
            className="d-flex align-items-center justify-content-between px-3 py-3 mb-4 rounded-3"
            style={{ background: "#f0f4f8", cursor: "pointer" }}
            onClick={() => setIsEditingUsername(true)}
            title="Click to edit"
          >
            <span className="fw-semibold text-dark fs-5">{user?.username || "—"}</span>
            <i className="fa-regular fa-pen-to-square text-secondary" />
          </div>
        )}

        {/* Card: Email + Group + Role */}
        <div className="bg-white rounded-4 shadow-sm p-3 mb-4">
          {/* Email Address (Locked) */}
          <p className="text-muted small fw-semibold mb-1">Email Address</p>
          <div className="d-flex align-items-center justify-content-between px-3 py-2 rounded-3 mb-3" style={{ background: "#f0f4f8" }}>
            <span className="text-secondary">{user?.email || "—"}</span>
            <i className="fa-solid fa-lock text-secondary" style={{ fontSize: 13 }} />
          </div>

          {/* Group + Role Layout Grid */}
          <Row className="g-2">
            {/* --- GROUP NAME SECTION --- */}
            <Col xs={6}>
              {isEditingGroup ? (
                <Form onSubmit={executeGroupUpdate} className="rounded-3 p-2 h-100" style={{ background: "#e8f4f8" }}>
                  <Form.Label className="mb-1 small fw-semibold" style={{ color: "#4a8fa8" }}>
                    Editing Group
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    value={groupNameInput}
                    onChange={(e) => setGroupNameInput(e.target.value)}
                    className="mb-2 fw-bold"
                    disabled={isSaving}
                    required
                    autoFocus
                  />
                  <div className="d-flex gap-1 justify-content-end">
                    <Button variant="success" size="sm" type="submit" className="py-0 px-2 small" disabled={isSaving}>
                      {isSaving ? "..." : "Save"}
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setIsEditingGroup(false)
                        setGroupNameInput(user?.groupName || "")
                      }}
                      className="py-0 px-2 small"
                      disabled={isSaving}
                    >
                      X
                    </Button>
                  </div>
                </Form>
              ) : (
                <div
                  className="rounded-3 p-3 h-100 position-relative"
                  style={{ background: "#e8f4f8", cursor: "pointer" }}
                  onClick={() => setIsEditingGroup(true)}
                  title="Click to edit group"
                >
                  <p className="mb-1 small" style={{ color: "#4a8fa8" }}>
                    Your Group <i className="fa-regular fa-pen-to-square ms-1" style={{ fontSize: "11px" }} />
                  </p>
                  <p className="mb-0 fw-bold" style={{ color: "#1a6680" }}>
                    {safeGroupName}
                  </p>
                </div>
              )}
            </Col>

            {/* Role (Read Only Display) */}
            <Col xs={6}>
              <div className="rounded-3 p-3 h-100" style={{ background: "#fef9e0" }}>
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

        {/* Delete Account Controls */}
        <Button
          variant="outline-danger"
          className="w-100 rounded-4 py-3 d-flex align-items-center justify-content-center gap-2"
          onClick={() => setShowDeleteModal(true)}
        >
          <i className="fa-regular fa-rectangle-xmark" />
          <span className="fw-semibold">Delete Account</span>
        </Button>
      </Container>

      {/* --- MODALS HANDLERS --- */}
      <DeleteAccountModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
    </>
  )
}

export default UserProfileDetails
