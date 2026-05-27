import { Container } from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import { useAppNavigation } from "../utils/useAppNavigation"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/authSlice"
import { logout } from "../redux/authSlice"

function TopBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const { navigateTo } = useAppNavigation()

  return (
    <Container fluid className="p-3 bg-white shadow-lg border-top d-flex justify-content-between ">
      <h1 className="text-light-navy m-0 d-flex align-items-center fs-3 cursor-pointer" onClick={() => navigateTo(isLoggedIn ? "home" : " ")}>
        <i className="bi bi-house-check me-2"></i>
        <span className="d-md-inline d-none fw-bold ">ChoreMate</span>
      </h1>

      <div className="d-none d-lg-block z-3">
        <NavigationBar variant="desktop" />
      </div>

      {!isLoggedIn ? (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium" onClick={() => navigateTo("login")}>
            Login
          </button>
          <button className="btn btn-warning px-3 rounded-pill fw-medium" style={{ backgroundColor: "#F1C40F" }} onClick={() => navigateTo("register")}>
            Register
          </button>
        </div>
      ) : (
        <button className="btn btn-outline-secondary px-3 rounded-pill fw-medium" onClick={() => dispatch(logout())}>
          Log out
        </button>
      )}
    </Container>
  )
}

export default TopBar
