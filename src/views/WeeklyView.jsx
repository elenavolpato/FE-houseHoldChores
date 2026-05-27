import { Container } from "react-bootstrap"
import WeeklySchedule from "../components/WeeklySchedule"
import NavigationBar from "../components/NavigationBar"
import ChoresStatus from "../components/ChoresStatus"
import HouseholdGoal from "../components/HouseholdGoal"
import GreetingSection from "../components/GrettingSection"

function WeeklyTasks() {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column my-3">
      <GreetingSection />
      <WeeklySchedule />
      <ChoresStatus filterType="date" />
      <HouseholdGoal />
      <NavigationBar />
    </Container>
  )
}
export default WeeklyTasks
