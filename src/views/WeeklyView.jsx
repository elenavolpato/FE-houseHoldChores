import { Container } from "react-bootstrap"
import WeeklySchedule from "@/features/chores/WeeklySchedule"
import NavigationBar from "@/components/NavigationBar"
import ChoresStatus from "@/features/chores/ChoresStatus"
import HouseholdGoal from "@/features/chores/HouseholdGoal"
import GreetingSection from "../features/chores/GreetingSection"

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
