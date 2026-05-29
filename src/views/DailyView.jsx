//import Goal from "@/components/Goal"
import GreetingSection from "../features/chores/GreetingSection"
import NavigationBar from "../components/NavigationBar"
import ChoresStatus from "../features/chores/ChoresStatus"

function DailyTasks() {
  return (
    <>
      <GreetingSection />
      <ChoresStatus filterType="all" />
      {/*  <Goal /> */}
      <NavigationBar variant="mobile" />
    </>
  )
}
export default DailyTasks
