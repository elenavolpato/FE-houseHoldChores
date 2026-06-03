import { useState } from "react"
import { Container, Form, Alert, InputGroup, Button } from "react-bootstrap"
import "/src/css/login.css"
import { useDispatch } from "react-redux"
import { login } from "@/redux/authSlice"
import { fetchCurrentUserProfile } from "@/services/authApi"
import { Link } from "react-router-dom"
import API_BASE_URL from "@/api"
import houseImg from "@/assets/login-house.png"

function Login() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

      const token = loginData.token || loginData.accessToken
      if (token) {
        dispatch(login(token))
        await dispatch(fetchCurrentUserProfile()).unwrap()
      } else {
        setError("Authentication token missing from server response.")
        setIsLoading(false)
        return
      }
    } catch (error) {
      console.error(error)
      setError("Cannot connect to the server. Check if backend is online.")
      setIsLoading(false)
    }
  }

  return (
    <Container className="w-75 login-container mt-5">
      <header className="text-center mb-4">
        <img src={houseImg} alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">Welcome back</h1>
        <p className="fw-semibold">Tackle household tasks with joy and ease</p>
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
          <Form.Text className="text-muted">We'll never share email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
            <Button variant="outline-secondary" onClick={() => setShow((prev) => !prev)} tabIndex={-1}>
              <i className={` ${show ? "fa-eye-slash" : "fa-eye"} fa-solid`}></i>
            </Button>
          </InputGroup>
          <Link to="/forgot-password" href="#" className="forgot-password text-light-navy fw-semibold position-absolute text-decoration-none">
            Forgot password?
          </Link>
        </Form.Group>

        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </Form>

      <div className="d-flex justify-content-center mt-5">
        <p>New to the household? </p>
        <Link to="/register" className="text-light-navy fw-bolder text-decoration-none cursor-pointer">
          &nbsp; Sign up
        </Link>
      </div>
    </Container>
  )
}

export default Login
