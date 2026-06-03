import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Form, Button, Container, Alert, InputGroup } from "react-bootstrap"

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") // ← grabs token from the URL
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg)
      }

      setSuccess(true)
      setTimeout(() => navigate("/login"), 3000) // redirect after 3s
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  // Guard: if no token in URL, show error immediately
  if (!token) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Alert variant="danger">Invalid or missing reset token.</Alert>
      </Container>
    )
  }

  return (
    <Container className="w-75 login-container mt-5">
      <h2 className="mb-4 text-light-navy text-center">Reset your password</h2>

      {success && <Alert variant="success">Password reset! Redirecting to login...</Alert>}

      {error && <Alert variant="danger">{error}</Alert>}

      {!success && (
        <Form onSubmit={handleSubmit} className="rounded-4 bg-white py-5 px-4">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={8}
              />
              <Button variant="outline-secondary" onClick={() => setShowPassword((p) => !p)} tabIndex={-1}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </Form.Group>

          <button className="btn-primary-custom login-btn w-100 mt-4" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      )}
    </Container>
  )
}

export default ResetPassword
