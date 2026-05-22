import { Col, Container, Row } from "react-bootstrap"

function Footer() {
  return (
    <footer className="py-4" style={{ backgroundColor: "#dde8e8", color: "#3a4a4a" }}>
      <Container>
        <Row>
          {/* Brand */}
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center fw-semibold mb-2" style={{ color: "#1a6e7a" }}>
              <span>ChoreMate</span>
            </div>
            <p className="small text-secondary mb-0" style={{ maxWidth: 200 }}>
              Professional-grade household management tools for modern families.
            </p>
          </Col>

          {/* Platform */}
          <Col xs={6} md={3} className="mb-4 mb-md-0">
            <p className="fw-semibold small mb-3">Platform</p>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Task Engine
                </a>
              </li>
              {/*  <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Pricing
                </a>
              </li> */}
            </ul>
          </Col>

          {/* Resources */}
          <Col xs={6} md={3} className="mb-4 mb-md-0">
            <p className="fw-semibold small mb-3">Resources</p>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Terms of Service
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col xs={12} md={3}>
            <p className="fw-semibold small mb-3">Contact</p>
            <div className="d-flex gap-1 justify-content-start">
              <a
                href="mailto:elena@raposinha.dev"
                className="rounded-circle border text-secondary text-decoration-none "
                style={{ width: 34, height: 34 }}
                aria-label="Email"
              >
                <i class="bi bi-envelope-at"></i>
              </a>
              <a
                href="https://raposinha.dev"
                target="_blank"
                className=" rounded-circle border text-secondary text-decoration-none"
                style={{ width: 34, height: 34 }}
                aria-label="Website"
              >
                <i class="bi bi-globe"></i>
              </a>
              <a href="https://github.com/elenavolpato" className=" rounded-circle border text-secondary text-decoration-none" target="_blank">
                <i class="bi bi-github "></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
