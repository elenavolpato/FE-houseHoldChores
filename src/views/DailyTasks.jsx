//import Goal from "../components/Goal"
import GreetingSection from "../components/GrettingSection"
import NavigationBar from "../components/NavigationBar"
import ChoresStatus from "../components/ChoresStatus"

function DailyTasks() {
  return (
    <>
      <GreetingSection />
      <ChoresStatus />
      {/*  <Goal /> */}
      <NavigationBar variant="mobile" />
    </>
  )
}
export default DailyTasks
