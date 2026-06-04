import { Container } from "react-bootstrap"

function Footer() {
  return (
    <footer className="py-4" style={{ backgroundColor: "#dde8e8", color: "#3a4a4a" }}>
      <Container>
        <div className="d-md-flex justify-content-evenly align-items-start w-100">
          <div className="d-block fw-semibold mb-3" style={{ color: "#1a6e7a" }}>
            <p>© 2026 ChoreMate</p>

            <a href="/privacy-policy" className="text-secondary text-decoration-none small fw-semibold pt-3">
              Privacy Policy
            </a>
          </div>
          <div>
            <p className="fw-semibold small mb-0">Get in touch</p>
            <span className="small text-secondary mb-2">elena@raposinha.dev</span>
            <div className="d-flex gap-2 justify-content-center">
              <a
                href="https://raposinha.dev"
                target="_blank"
                className="d-flex align-items-center justify-content-center rounded-circle border text-secondary text-decoration-none"
                style={{ width: 34, height: 34 }}
                aria-label="Website"
              >
                <i className="bi bi-globe"></i>
              </a>
              <a
                href="https://github.com/elenavolpato"
                target="_blank"
                className="d-flex align-items-center justify-content-center rounded-circle border text-secondary text-decoration-none"
                style={{ width: 34, height: 34 }}
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
          <div className="rounded-pill position-absolute top-100 start-100">v1.0</div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
