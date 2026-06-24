import { Container, Dropdown } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn, logout } from "@/redux/authSlice"
import { useEffect } from "react"
import { getAllGroupMembers } from "../services/groupApi"
import { Link, useLocation } from "react-router-dom"
import "../css/topBar.css"

function TopBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllGroupMembers())
    }
  }, [dispatch, isLoggedIn])

  const showAuthButtons = !isLoggedIn && location.pathname !== "/login" && location.pathname !== "/register"

  return (
    <>
      <Container fluid className="p-3 bg-white shadow-lg border-top d-flex justify-content-between align-items-center sticky-top">
        <Link to={isLoggedIn ? "home" : " "} className="text-light-navy m-0 ps-md-2 d-flex align-items-center fs-3 text-decoration-none">
          <i className="bi bi-house-check me-2 fs-3 top-bar-icon"></i>
          <h1 className="d-md-inline fw-bold mt-3 fs-3 pb-1 top-bar-logo">ChoreMate</h1>
        </Link>

        <div className="d-none d-lg-block z-3">
          <NavigationBar variant="desktop" />
        </div>

        {showAuthButtons && (
          <>
            {/* Full buttons on md+ screens */}
            <div className="d-none d-md-flex gap-2">
              <Link to="/login">
                <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-warning px-3 rounded-pill fw-medium" style={{ backgroundColor: "#F1C40F" }}>
                  Register
                </button>
              </Link>
            </div>

            {/* Hamburger dropdown on small screens */}
            <div className="d-flex d-md-none">
              <Dropdown align="end">
                <Dropdown.Toggle as="button" className="btn btn-outline-secondary border rounded-pill px-3 py-1" style={{ background: "none" }}>
                  <i className="bi bi-list fs-5"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow border-0 mt-2 p-2">
                  <Dropdown.Item as={Link} to="/login" className="text-dark fw-medium">
                    <i className="bi bi-box-arrow-in-right me-2"></i>Login
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/register" className="fw-medium" style={{ color: "#b8960c" }}>
                    <i className="bi bi-person-plus me-2"></i>Register
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        )}

        {isLoggedIn && user && (
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="d-flex align-items-center gap-1 cursor-pointer border rounded-pill px-3 py-1 bg-light shadow-sm">
              {user?.avatarUrl ? (
                <img
                  src={user?.avatarUrl}
                  alt={user?.username}
                  className="rounded-circle object-fit-cover"
                  style={{ width: "25px", height: "25px", marginLeft: "-10px" }}
                />
              ) : (
                <i className="fa-solid fa-circle-user text-secondary fs-1 " style={{ marginLeft: "-10px", marginTop: "0" }}></i>
              )}
              <span className="fw-medium text-secondary m-1 d-none d-md-block">{user?.username}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow border-0 mt-2 p-2">
              <Dropdown.Item as={Link} to="/me" className="text-dark">
                <i className="fa-regular fa-user me-2"></i>My profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => dispatch(logout())} className="text-danger">
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </>
  )
}

export default TopBar
