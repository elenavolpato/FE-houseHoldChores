import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateGroupNameApi } from "../../services/groupApi"
import { updateGroupName } from "../../redux/choresSlice"

function GroupNameChanger() {
  const dispatch = useDispatch()

  // read the current group data from Redux store
  const reduxGroupName = useSelector((state) => state.chores.groupName || "My Household")
  const groupId = useSelector((state) => state.auth.user?.groupId)

  // safe name to prevent undefined to slip in
  const safeGroupName = reduxGroupName || "My Household"
  const [localNameInput, setLocalNameInput] = useState(safeGroupName)

  // local editing states
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [error, setError] = useState("")

  // keep the local text field synced whenever Redux changes
  useEffect(() => {
    if (!isEditing) {
      setLocalNameInput(safeGroupName)
    }
  }, [safeGroupName, isEditing])

  const handleSaveGroupName = async (e) => {
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
        <div className="d-flex align-items-center justify-content-between bg-light p-2 rounded-4 border border-light-subtle">
          <h3 className="h5 fw-bold text-dark mb-0 px-2">{safeGroupName}</h3>
          <Button variant="link" className="text-secondary text-decoration-none py-0 small fw-semibold" onClick={() => setIsEditing(true)}>
            <i className="fa-solid fa-pen-to-square me-1"></i> Rename
          </Button>
        </div>
      )}
    </div>
  )
}

export default GroupNameChanger
