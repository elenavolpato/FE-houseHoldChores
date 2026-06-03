import { Col, Container, Row } from "react-bootstrap"

function Footer() {
  return (
    <footer className="py-4" style={{ backgroundColor: "#dde8e8", color: "#3a4a4a" }}>
      <Container>
        <Row>
          {/* Brand */}
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <div
              className="d-flex align-items-center text-md-start text-center justify-content-center justify-content-md-start fw-semibold mb-2 "
              style={{ color: "#1a6e7a" }}
            >
              <span>ChoreMate</span>
            </div>
            <p className="small text-secondary mb-0 text-md-start text-center px-5 px-md-0">
              Professional-grade household management tools for modern families.
            </p>
          </Col>

          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <a href="/privacy-policy" className="text-secondary text-decoration-none small fw-semibold small mb-3">
              Privacy Policy
            </a>
          </Col>

          {/* Contact */}
          <Col xs={12} md={4}>
            <p className="fw-semibold small mb-2">Get in touch</p>

            <span>elena@raposinha.dev</span>
            <div className="d-flex gap-1 justify-content-center">
              <a
                href="https://raposinha.dev"
                target="_blank"
                className=" rounded-circle border text-secondary text-decoration-none"
                style={{ width: 34, height: 34 }}
                aria-label="Website"
              >
                <i className="bi bi-globe"></i>
              </a>
              <a href="https://github.com/elenavolpato" className=" rounded-circle border text-secondary text-decoration-none" target="_blank">
                <i className="bi bi-github "></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
