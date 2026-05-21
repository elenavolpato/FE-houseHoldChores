import { Badge, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
import "../css/hero.css"

function Hero() {
  // eslint-disable-next-line no-unused-vars
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <section className="hero-section d-flex py-5 ">
        <Container>
          <Row className="align-items-center g-5 text-center text-md-start">
            {/* Left */}
            <Col lg={6} className="hero-content ">
              <Badge bg="warning" className="badge-pill rounded-5 mb-3 px-4 py-2 fw-light text-black">
                Simplified Household Management
              </Badge>

              <h1 className="hero-title mt-4 mt-md-0">
                The chore list your family will <span className="underline-accent">actually</span> use
              </h1>

              <p className="hero-subtitle">
                Coordinate household tasks with ease. Track, assign, and manage your home's daily operations in one central place.
              </p>

              <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start">
                <button className="btn-primary-custom" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                  Get started for free
                  <span className="arrow">→</span>
                </button>

                <button className="btn-outline-custom">Login</button>
              </div>
            </Col>

            {/* Right  */}
            <Col lg={6} className="hero-visual">
              <div className="visual-wrapper">
                <div className="scene-card">
                  <div className="scene-illustration">
                    <img src="src/assets/hero-img.png" alt="image of two people watering plants in a house" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Hero
