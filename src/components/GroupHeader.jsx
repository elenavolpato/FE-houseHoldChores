import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateGroupName } from "../redux/choresSlice" // Adjust path to your slice

function GroupHeader() {
  const dispatch = useDispatch()

  // 1. Pull current group name from Redux
  const currentGroupName = useSelector((state) => state.chores.groupName) || "Sunnyside Flat"

  // 2. Local states to manage editing mode UI toggle and temporary input text
  const [isEditing, setIsEditing] = useState(false)
  const [newGroupName, setNewGroupName] = useState(currentGroupName)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 3. YOUR HANDLE FUNCTION: Connects the text input straight to the Backend API
  const handleNameChange = async () => {
    // Prevent empty name strings
    if (!newGroupName.trim() || newGroupName === currentGroupName) {
      setIsEditing(false)
      return
    }

    setIsSubmitting(true)

    try {
      // Replace with your true backend URL endpoint and configuration options
      const response = await fetch("https://api.yourdomain.com/group/update-name", {
        method: "PATCH", // or 'PUT' depending on your backend specification
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${token}` // Include if your API requires auth tokens
        },
        body: JSON.stringify({ name: newGroupName.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to update group name on the server.")
      }

      // Parse response data if your backend returns the updated object frame
      const data = await response.json()

      // 4. Update the global Redux state so headers everywhere change instantly
      dispatch(updateGroupName(newGroupName.trim()))
      setIsEditing(false)
    } catch (error) {
      console.error("API Error updating group name:", error)
      alert("Could not update group name. Please try again later.")
      setNewGroupName(currentGroupName) // Rollback to original name on failure
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="d-flex align-items-center mb-4">
      {isEditing ? (
        /* --- EDIT MODE INPUT UI --- */
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control form-control-sm fw-bold fs-4 border-primary text-dark-navy px-2 py-0"
            style={{ maxWidth: "240px", height: "38px", color: "#004B6E" }}
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            disabled={isSubmitting}
            autoFocus
          />
          <button
            className="btn btn-success btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            onClick={handleNameChange}
            disabled={isSubmitting}
          >
            <i className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-check"}`}></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
            onClick={() => {
              setIsEditing(false)
              setNewGroupName(currentGroupName) // reset input
            }}
            disabled={isSubmitting}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        /* --- STANDARD DISPLAY UI --- */
        <div className="d-flex align-items-center gap-2">
          <h1 className="h3 fw-bold mb-0" style={{ color: "#004B6E" }}>
            {currentGroupName}
          </h1>
          {/* Subtle inline edit pencil icon button */}
          <button className="btn p-0 border-0 text-muted opacity-50 hover-opacity-100 ms-1" onClick={() => setIsEditing(true)}>
            <i className="fa-solid fa-pen-to-square fs-6"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default GroupHeader
