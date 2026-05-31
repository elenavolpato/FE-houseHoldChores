import { Col, Container } from "react-bootstrap"
import "/src/css/greetingSection.css"
import { useSelector } from "react-redux"

function GreetingSection() {
  const currentTime = new Date()
  const hours = currentTime.getHours()

  const username = useSelector((state) => state.auth.user?.username) || "Guest"

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        <p className="text-light-navy caps-title mb-2">TODAY'S OVERVIEW</p>
        {hours < 12 && <h1>Good Morning {username}!</h1>}
        {hours >= 12 && hours < 18 && <h1>Good Afternoon {username}!</h1>}
        {hours >= 18 && <h1>Good Evening {username}!</h1>}
      </Col>
    </Container>
  )
}

export default GreetingSection
