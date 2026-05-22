import { Container } from "react-bootstrap"

function TopBar() {
  return (
    <Container fluid className="p-3 border-bottom border-b-8 d-flex justify-content-between ">
      <h1 className="text-light-navy m-0 pt-1 d-flex align-items-center">
        <i class="bi bi-house-check h1 px-2"></i>
        <span className="d-md-flex d-none">ChoreMate</span>
      </h1>
      <div>
        <button className="btn-outline-custom mx-2"> Login</button>
        <button className="btn-primary-custom">Register</button>
      </div>
    </Container>
  )
}

export default TopBar
