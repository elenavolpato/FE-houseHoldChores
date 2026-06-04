import { Container, Dropdown } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn, logout } from "@/redux/authSlice"
import { useEffect } from "react"
import { getAllGroupMembers } from "../services/groupApi"
import { Link, useLocation } from "react-router-dom"

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
        <Link to={isLoggedIn ? "home" : " "} className="text-light-navy m-0 d-flex align-items-center fs-3 text-decoration-none">
          <i className="bi bi-house-check me-2 fs-1 "></i>
          <h1 className="d-md-inline fw-bold mt-3">ChoreMate</h1>
        </Link>

        <div className="d-none d-lg-block z-3">
          <NavigationBar variant="desktop" />
        </div>

        {showAuthButtons && (
          <div className="d-flex gap-2">
            <Link to="/login">
              <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-warning px-3 rounded-pill fw-medium" style={{ backgroundColor: "#F1C40F" }}>
                Register
              </button>
            </Link>
          </div>
        )}

        {isLoggedIn && user && (
          <Dropdown align="end">
            <Dropdown.Toggle as="div" className="d-flex align-items-center gap-1 cursor-pointer border rounded-pill px-3 py-1 bg-light shadow-sm">
              {user?.avatarUrl ? (
                <img
                  src={user?.avatarUrl}
                  alt={user?.username}
                  className="rounded-circle object-fit-cover "
                  style={{ width: "35px", height: "35px", marginLeft: "-10px" }}
                />
              ) : (
                <i
                  className="fa-solid fa-circle-user text-secondary fs-2 b"
                  style={{ width: "35px", height: "35px", marginLeft: "-10px", marginTop: "5px" }}
                ></i>
              )}
              <span className="fw-medium text-secondary m-1">{user?.username}</span>
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
