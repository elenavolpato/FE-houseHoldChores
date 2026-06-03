import { Container } from "react-bootstrap"
import "@/css/noGroups.css"
import noGroupIcon from "@/assets/no-group-icon.png"

const NoGroups = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center">
      <img src={noGroupIcon} alt="icon image" style={{ maxWidth: "400px" }} />
      <h3 className="fw-bold">No groups yet</h3>
      <p className="px-5 mb-5">Manage your household chores together by joining or creating a group</p>
    </Container>
  )
}
export default NoGroups
