import { useState } from "react"
import { Container } from "react-bootstrap"
import NavigationBar from "./NavigationBar"

function TopBar() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false) // todo connect with token existance on localStorage
  console.log(isLoggedIn)
  return (
    <Container fluid className="p-3 bg-white shadow-lg border-top d-flex justify-content-between ">
      {/* 1. LEFT SIDE: Logo and Brand */}
      <h1 className="text-light-navy m-0 d-flex align-items-center fs-3">
        <i className="bi bi-house-check me-2"></i>
        <span className="d-md-inline d-none fw-bold">ChoreMate</span>
      </h1>

      {/* 2. MIDDLE: Navigation Links (Wrapped in a responsive div) */}
      <div className="d-none d-lg-block z-3">
        <NavigationBar variant="desktop" />
      </div>

      {/* 3. RIGHT SIDE: Conditional Auth Buttons */}
      {!isLoggedIn ? (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium">Login</button>
          <button className="btn btn-warning px-3 rounded-pill fw-medium" style={{ backgroundColor: "#F1C40F" }}>
            Register
          </button>
        </div>
      ) : (
        // Optional fallback layout context for when user is logged in
        <div className="text-muted small fw-medium">Welcome back!</div>
      )}
    </Container>
  )
}

export default TopBar
