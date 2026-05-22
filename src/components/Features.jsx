import { Col, Container, Row } from "react-bootstrap"
import "../css/features.css"

function Features() {
  return (
    <section>
      <Container className="my-5 px-4">
        <div className="mb-5">
          <h2>Why Chores Mate? </h2>
          <p>Designed for clarity and efficiency in every room of your home</p>
        </div>
        <Row className="d-flex justify-content-between">
          <Col md={12} lg={4} className="feature-card rounded-4 p-4 mb-3">
            <i className="bi bi-people h1"></i>
            <h4>Household Sync</h4>
            <p>Real-time updates across all desktop and mobile browsers. Keep the whole household on the same page without the constant checking-in.</p>
          </Col>
          <Col md={12} lg={3} className="feature-card rounded-4 p-4 mb-3">
            <i className="bi bi-calendar3 h1 color--teal"></i>
            <h4>Intelligent Scheduling</h4>
            <p>Automatic rotation of tasks ensures a fair distribution of work across everyone in the household.</p>
          </Col>
          <Col md={12} lg={3} className="feature-card rounded-4 p-4 h-min">
            <i className="bi bi-view-stacked h1 m-2"></i>
            <h4>Whole-Home View</h4>
            <p>A comprehensive bird's-eye view of your household's status, from chores to groceries.</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Features
