import { Alert, Container, Form } from "react-bootstrap"
import { useAppNavigation } from "@/utils/useAppNavigation"
import { useState } from "react"

function Register() {
  const { navigateTo } = useAppNavigation()

  // 1. Manage form state fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // 2. Manage error and loading states
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Update input data dynamically
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]) // Reset errors across attempts

    // Frontend validation check
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match."])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // 4. Handle errors thrown by your ExceptionsHandler
        if (data.errors) {
          // Captures PayloadValidation / MethodArgumentNotValid arrays
          setErrors(data.errors)
        } else if (data.message) {
          // Captures standard ExceptionDTO issues like EmailAlreadyExistsException
          setErrors([data.message])
        } else {
          setErrors(["An unexpected error occurred."])
        }
        setIsLoading(false)
        return
      }

      // Success! Move user to login
      alert("Account created successfully! Please sign in.")
      navigateTo("login")
    } catch (error) {
      setErrors(["Cannot connect to the server. Is your Spring Boot app running?"])
      setIsLoading(false)
    }
  }

  return (
    <Container className="w-75 login-container  mt-5 ">
      <header className="text-center mb-4">
        {/* todo change image */}
        <img src="src/assets/login_house.png" alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">Create account</h1>
      </header>
      {/* 5. Render active alert lists if validation fails */}
      {errors.length > 0 && (
        <Alert variant="danger" className="rounded-3">
          <ul className="mb-0">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Form className="rounded-4 bg-white py-5 px-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="fw-semibold">Username</Form.Label>
          <Form.Control
            type="text"
            name="username" // 👈 Added matching name tag
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-semibold">Email address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formRepeatPassword">
          <Form.Label className="fw-semibold">Confirm password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat Password"
            required
          />
        </Form.Group>

        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </Form>

      <div className="d-flex justify-content-center mt-5">
        <p>Already have an account? </p>
        <a className="text-light-navy fw-bolder text-decoration-none cursor-pointer" onClick={() => navigateTo("login")}>
          {" "}
          &nbsp; Login
        </a>
      </div>
    </Container>
  )
}

export default Register
