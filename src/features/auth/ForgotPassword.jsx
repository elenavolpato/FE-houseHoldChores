import { useState } from "react"
import { Container, Form, Alert } from "react-bootstrap"
import "/src/css/login.css"
import { useAppNavigation } from "@/utils/useAppNavigation"
import API_BASE_URL from "@/api"

function ForgotPassword() {
  const { navigateTo } = useAppNavigation()
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })

      let data = {}
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await res.json()
      }

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please check your email and try again.")
        setIsLoading(false)
        return
      }

      // 🎉 Success! The email was processed.
      setIsLoading(false)
      setSuccessMessage("If that email exists in our system, a password reset link has been sent!")

      setFormData({ email: "" })
      setTimeout(() => {
        navigateTo("/login")
      }, 3000)
    } catch (error) {
      console.error(error)
      setError("Cannot connect to the server. Check if backend is online.")
      setIsLoading(false)
    }
  }

  return (
    <Container className="w-75 login-container mt-5">
      <header className="text-center mb-4">
        <h1 className="text-light-navy">Reset password</h1>
      </header>

      {/* Render error banner if login fails */}
      {error && (
        <Alert variant="danger" className="rounded-3">
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="warning" className="rounded-3">
          {successMessage}
        </Alert>
      )}

      <Form className="rounded-4 bg-white py-5 px-4" onSubmit={handleForgotPassword}>
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
        </Form.Group>

        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit" disabled={isLoading}>
          {isLoading ? "Sending email..." : "Reset password"}
        </button>
      </Form>
    </Container>
  )
}

export default ForgotPassword
