import { Col, Container, Row } from "react-bootstrap"
import "../css/greetingSection.css"

function GreetingSection() {
  const currentTime = new Date()
  const hours = currentTime.getHours()

  const name = "Baba"
  const totalTasks = 6
  const completedTasks = 4

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        <p className="text-light-navy caps-title mb-2">TODAY'S OVERVIEW</p>
        {hours < 12 && <h1>Good Morning {name}!</h1>}
        {hours >= 12 && hours < 18 && <h1>Good Afternoon {name}!</h1>}
        {hours >= 18 && <h1>Good Evening {name}!</h1>}

        {/* CHANGED FROM <Row> TO A STANDARD <div className="d-flex"> */}
        <div className="d-flex align-items-center justify-content-between bg-white rounded-3 p-4 my-4 ambient-shadow">
          <div>
            <p className="m-0 fs-5">
              You've completed{" "}
              <span className="text-light-navy fw-bolder">
                {completedTasks} of {totalTasks}&nbsp;
              </span>
              chores!
              <br />
              <span className="text-muted small">Keep it up!</span>
            </p>
          </div>

          <div>
            {/* TODO CHANGE THE IMAGE FOR A CIRCLE THAT COMPLETES ITSELF. */}
            <img src="src/assets/login_house.png" alt="house image" className="tasks-completed" style={{ maxWidth: "80px", height: "auto" }} />
          </div>
        </div>
      </Col>
    </Container>
  )
}

export default GreetingSection
