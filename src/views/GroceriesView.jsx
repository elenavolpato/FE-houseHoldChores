import { Container } from "react-bootstrap"
import GroceriesList from "@/features/groceries/GroceriesList"
import NavigationBar from "@/components/NavigationBar"

function GroceriesView() {
  return (
    <Container>
      <GroceriesList />
      <NavigationBar />
    </Container>
  )
}

export default GroceriesView
