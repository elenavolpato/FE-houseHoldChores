import { Container, Form } from "react-bootstrap"
//import "../css/register.css"

function Register() {
  return (
    <Container className="w-75 login-container  mt-5 ">
      <header className="text-center mb-4">
        {/* todo change image */}
        <img src="src/assets/login_house.png" alt="illustration of a house with a smile" />
        <h1 className="text-light-navy">Create account</h1>
      </header>
      <Form className="rounded-4 bg-white py-5 px-4">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="fw-semibold">Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-semibold">Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 position-relative" controlId="formPassword">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <a href="#" className="forgot-password text-light-navy fw-semibold position-absolute text-decoration-none"></a>
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formRepeatPassword">
          <Form.Label className="fw-semibold">Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <a href="#" className="forgot-password text-light-navy fw-semibold position-absolute text-decoration-none"></a>
        </Form.Group>
        <button className="btn-primary-custom login-btn w-100 mt-4" type="submit">
          Register
        </button>
      </Form>
      <div className="d-flex justify-content-center mt-5">
        <p>Already have an account? </p>
        <a className="text-light-navy fw-bolder text-decoration-none cursor-pointer"> &nbsp; Login</a>
      </div>
    </Container>
  )
}

export default Register
