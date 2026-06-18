import { useState, useEffect } from "react"
import { Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateGroupNameApi } from "../../services/groupApi"
import { updateGroupName } from "../../redux/groupSlice"

function GroupNameChanger() {
  const dispatch = useDispatch()
  const reduxGroupName = useSelector((state) => state.group.groupName || "My Household")
  const groupId = useSelector((state) => state.auth.user?.groupId)
  const user = useSelector((state) => state.auth.user)

  const safeGroupName = reduxGroupName || "My Household"
  const [localNameInput, setLocalNameInput] = useState(safeGroupName)

  const [isEditing, setIsEditing] = useState(false)
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isEditing) {
      // eslint-disable-next-line
      setLocalNameInput(safeGroupName)
    }
  }, [safeGroupName, isEditing])

  const handleSaveGroupName = async (e) => {
    console.log(user)
    e.preventDefault()

    // if nothing changes, just close the editor without sending anything to the server
    if (!localNameInput.trim() || localNameInput === safeGroupName) {
      setIsEditing(false)
      return
    }

    setIsUpdatingName(true)
    setError("")

    try {
      // Submit the change to database backend including your groupId
      await dispatch(
        updateGroupNameApi({
          groupId,
          newGroupName: localNameInput.trim(),
        }),
      ).unwrap()

      // update name in store
      dispatch(updateGroupName(localNameInput.trim()))

      setIsEditing(false)
    } catch (err) {
      setError(err || "Could not update the household name.")
      setLocalNameInput(safeGroupName) // revert state back safely on catch error
    } finally {
      setIsUpdatingName(false)
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Rename group
    </Tooltip>
  )

  return (
    <div className="mb-4">
      {error && <div className="alert alert-danger py-2 small rounded-3 mb-2">{error}</div>}

      {isEditing ? (
        <Form onSubmit={handleSaveGroupName} className="d-flex gap-2 align-items-center">
          <Form.Control
            type="text"
            value={localNameInput}
            onChange={(e) => setLocalNameInput(e.target.value)}
            className="rounded-3 shadow-sm p-2 fw-bold h5 mb-0"
            autoFocus
            disabled={isUpdatingName}
          />
          <Button type="submit" variant="warning" size="sm" className="rounded-3 px-3 fw-bold" disabled={isUpdatingName}>
            {isUpdatingName ? "..." : "Save"}
          </Button>
          <Button
            variant="light"
            size="sm"
            className="rounded-3 border"
            onClick={() => {
              setIsEditing(false)
              setLocalNameInput(safeGroupName)
            }}
            disabled={isUpdatingName}
          >
            ✕
          </Button>
        </Form>
      ) : (
        <div className="d-flex align-items-center justify-content-between p-2">
          <h2 className="h3 fw-bold mb-0 custom-navy-title">{safeGroupName}</h2>
          <div>
            {user.role === "ADMIN" && (
              <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <Button variant="link" className="text-secondary text-decoration-none py-0 small fw-semibold" onClick={() => setIsEditing(true)}>
                  <i className="fa-solid fa-pen-to-square me-0"></i>
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupNameChanger
