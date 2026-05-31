import { useEffect, useState } from "react"
import { Card, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getAllGroupMembers } from "../../services/groupApi"
import GroupNameChanger from "./GroupNameChanger"
import { updateGroupName } from "../../redux/choresSlice"

function GroupMembersList() {
  const dispatch = useDispatch()

  // core States
  const [groupMembers, setGroupMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [groupName, setGroupName] = useState("")

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await dispatch(getAllGroupMembers()).unwrap()
        setGroupMembers(data)
        if (data && data.length > 0 && data[0].group) {
          const fetchedName = data[0].group.groupName || "My Household"
          setGroupName(fetchedName)
          dispatch(updateGroupName(fetchedName))
        }
      } catch (err) {
        setError(err || "Failed to load household data.")
      } finally {
        setLoading(false)
      }
    }
    getGroups()
  }, [dispatch])

  if (loading) return <div className="text-center mt-5 text-muted small fw-semibold">Loading household data...</div>
  if (error) return <div className="alert alert-danger m-3 rounded-4">{error}</div>

  return (
    <Col className="mx-3">
      <h2 className=" mb-4 mt-2">Your group</h2>
      <GroupNameChanger groupName={groupName} />
      <div className="d-flex flex-column gap-3">
        {groupMembers.map((member) => {
          return (
            <Card key={member.id} className="border-0 shadow-sm rounded-4 bg-white">
              <Card.Body className="p-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <img
                      src={member.avatarUrl || "src/assets/login_house.png"}
                      alt={member.username}
                      className="rounded-circle object-fit-cover"
                      style={{ width: "54px", height: "54px" }}
                    />

                    <span
                      className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        backgroundColor: "#FFD700",
                        width: "20px",
                        height: "20px",
                        border: "2px solid #FFF",
                        fontSize: "10px",
                      }}
                    >
                      <i className="fa-solid fa-star text-white"></i>
                    </span>
                  </div>

                  <div>
                    <h4 className="h6 fw-bold mb-0 text-dark">{member.username}</h4>
                    <span className="text-muted small" style={{ fontSize: "13px" }}>
                      {member.email}
                    </span>
                  </div>
                </div>

                <span
                  className="fw-bold tracking-wider"
                  style={{
                    fontSize: "12px",
                    color: "#005580",
                    letterSpacing: "0.5px",
                  }}
                >
                  {member.role === "ADMIN" ? "ADMIN" : "MEMBER"}
                </span>
              </Card.Body>
            </Card>
          )
        })}

        {groupMembers.length === 0 && <p className="text-center text-muted small mt-4">No household members mapped to this active group.</p>}
      </div>
    </Col>
  )
}

export default GroupMembersList
