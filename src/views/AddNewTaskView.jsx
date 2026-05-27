import { Container } from "react-bootstrap"
import PickChore from "../components/PickChore"
import CreateCustomChore from "../components/CreateCustomChore"
import NavigationBar from "../components/NavigationBar"

function AddNewTask() {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column my-3">
      <PickChore />
      <CreateCustomChore />
      <NavigationBar />
    </Container>
  )
}

export default AddNewTask
