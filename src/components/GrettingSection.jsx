import { Col, Container } from "react-bootstrap"
import "../css/greetingSection.css"

function GreetingSection() {
  const currentTime = new Date()
  const hours = currentTime.getHours()

  const name = "Baba"

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        <p className="text-light-navy caps-title mb-2">TODAY'S OVERVIEW</p>
        {hours < 12 && <h1>Good Morning {name}!</h1>}
        {hours >= 12 && hours < 18 && <h1>Good Afternoon {name}!</h1>}
        {hours >= 18 && <h1>Good Evening {name}!</h1>}
      </Col>
    </Container>
  )
}

export default GreetingSection
