import { Container, Form } from "react-bootstrap"
import "../css/login.css"

function Login() {
  return (
    <Container className="w-75 login-container  mt-5 ">
      <header className="text-center mb-4">
        <img src="src/assets/login_house.png" alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">Welcome back</h1>
        <p className="fw-semibold">Tackle your household tasks with joy and ease</p>
      </header>
      <Form className="rounded-4 bg-white py-5 px-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-semibold">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <a href="#" className="forgot-password text-light-navy fw-semibold position-absolute text-decoration-none">
            Forgot password?
          </a>
        </Form.Group>
        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit">
          Login
        </button>
      </Form>
      <div className="d-flex justify-content-center mt-5">
        <p>New to the household? </p>
        <a className="text-light-navy fw-bolder text-decoration-none cursor-pointer"> &nbsp; Sign up</a>
      </div>
    </Container>
  )
}

export default Login
