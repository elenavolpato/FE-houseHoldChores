import { Col, Container, Row } from "react-bootstrap"
import "../css/greetingSection.css"

function GreetingSection() {
  const currentTime = new Date()
  currentTime.getHours

  const name = "Baba"

  const totalTasks = 6
  const completedTasks = 4
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center py-3">
        <Col md={6}>
          <p className="text-light-navy caps-title mb-2">TODAY'S OVERVIEW</p>
          {currentTime < 12 && <h1>Good Morning {name}!</h1>}
          {currentTime >= 12 && currentTime < 18 && <h1>Good Afternoon {name}!</h1>}
          {currentTime >= 18 && <h1>Good Evening {name}!</h1>}

          <Row className="bg-white rounded-3 p-3 my-4 d-flex ambient-shadow align-items-center">
            <Col className="col-9 p-3  ">
              <p className="m-0">
                You've completed{" "}
                <span className="text-light-navy fw-bolder">
                  {completedTasks} of {totalTasks}&nbsp;
                </span>
                chores!
                <br />
                Keep it up!
              </p>
            </Col>
            <Col className="col-3">
              {/* TODO CHANGE THE IMAGE FOR A CIRCLE THAT COMPLETES IT SELF.  */}
              <img src="src/assets/login_house.png" alt="house image" className="tasks-completed" />
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  )
}

export default GreetingSection
