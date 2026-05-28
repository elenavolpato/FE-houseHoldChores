import { useState } from "react"
import { Container, Form, Alert } from "react-bootstrap"
import "../css/login.css"
import { useAppNavigation } from "../utils/useAppNavigation"
import { useDispatch } from "react-redux"
import { login } from "../redux/authSlice"

function Login() {
  const { navigateTo } = useAppNavigation()
  const dispatch = useDispatch()

  // 1. Manage form field state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // 2. Manage UI states (errors & loading)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Track field inputs dynamically
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // 1. Authenticate and login
      const loginResponse = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        setError(loginData.message || "Invalid email or password.")
        setIsLoading(false)
        return
      }

      // 2. Extract and save token securely
      const token = loginData.token || loginData.accessToken
      if (token) {
        localStorage.setItem("token", token)
        dispatch(login(token))
        navigateTo("home")
      } else {
        setError("Authentication token missing from server response.")
        setIsLoading(false)
        return
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Cannot connect to the server. Check if your backend is online.")
      setIsLoading(false)
    }
  }

  return (
    <Container className="w-75 login-container mt-5">
      <header className="text-center mb-4">
        <img src="src/assets/login_house.png" alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">Welcome back</h1>
        <p className="fw-semibold">Tackle your household tasks with joy and ease</p>
      </header>

      {/* Render error banner if login fails */}
      {error && (
        <Alert variant="danger" className="rounded-3">
          {error}
        </Alert>
      )}

      <Form className="rounded-4 bg-white py-5 px-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-semibold">Email address</Form.Label>
          <Form.Control
            type="email"
            name="email" // 👈 Added name matching state key
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <a href="#" className="forgot-password text-light-navy fw-semibold position-absolute text-decoration-none">
            Forgot password?
          </a>
        </Form.Group>

        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </Form>

      <div className="d-flex justify-content-center mt-5">
        <p>New to the household? </p>
        <a className="text-light-navy fw-bolder text-decoration-none cursor-pointer" onClick={() => navigateTo("register")}>
          &nbsp; Sign up
        </a>
      </div>
    </Container>
  )
}

export default Login
