import { Container } from "react-bootstrap"
import GroceriesList from "../components/GroceriesList"
import NavigationBar from "../components/NavigationBar"

function GroceriesView() {
  return (
    <Container>
      <GroceriesList />
      <NavigationBar />
    </Container>
  )
}

export default GroceriesView
