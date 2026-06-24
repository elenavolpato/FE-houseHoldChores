import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap"
import { useAppNavigation } from "@/utils/useAppNavigation"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import API_BASE_URL from "@/api"

function Register() {
  const { navigateTo } = useAppNavigation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const emailFromInvite = searchParams.get("email")

  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const greetings = !token ? "Create account" : "Join group"

  const [formData, setFormData] = useState({
    username: "",
    email: emailFromInvite || "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrors([])

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match."])
      return
    }

    setIsLoading(true)

    const endpoint = token ? "register-with-invite" : "register"
    // conditional payload
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    // attach the token key if it is actually present
    if (token) {
      payload.token = token
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else if (data.message) {
          setErrors([data.message])
        } else {
          setErrors(["An unexpected error occurred."])
        }
        setIsLoading(false)
        return
      }

      alert("Account created successfully! Please sign in.")
      navigateTo("login")
    } catch (error) {
      console.error(error)
      setErrors(["Cannot connect to the server. Is Spring Boot app running?"])
      setIsLoading(false)
    }
  }

  return (
    <Container className="w-md-75 login-container  mt-5 ">
      <header className="text-center mb-4">
        <img src={`${import.meta.env.BASE_URL}assets/login-house.png`} alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">{greetings}</h1>
      </header>
      {errors.length > 0 && (
        <Alert variant="danger" className="rounded-3">
          <ul className="mb-0">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form className="rounded-4 bg-white py-5 px-4" onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="fw-semibold">Username</Form.Label>
          <InputGroup>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-semibold">Email address</Form.Label>
          <InputGroup>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <InputGroup>
            <Form.Control type={show ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <Button variant="outline-secondary" onClick={() => setShow((prev) => !prev)} tabIndex={-1}>
              <i className={` ${show ? "fa-eye-slash" : "fa-eye"} fa-solid`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formRepeatPassword">
          <Form.Label className="fw-semibold">Confirm password</Form.Label>
          <InputGroup>
            <Form.Control
              type={show ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              required
            />
            <Button variant="outline-secondary" onClick={() => setShow((prev) => !prev)} tabIndex={-1}>
              <i className={`${show ? "fa-eye-slash" : "fa-eye"} fa-solid`}></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </Form>

      <div className="d-flex justify-content-center mt-5">
        <p>Already have an account? </p>
        <Link to="/login" className="text-light-navy fw-bolder text-decoration-none cursor-pointer">
          &nbsp; Login
        </Link>
      </div>
    </Container>
  )
}

export default Register
