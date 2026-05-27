import { useState } from "react"
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap"
import CreateGroupModal from "./CreateGroupModal"

function CreateGroups() {
  const [searchEmail, setSearchEmail] = useState("")
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)

  return (
    <Container className="py-4 px-3" style={{ maxWidth: "500px" }}>
      <h1>Manage Group</h1>
      <Row className="g-3 mb-4">
        <Col xs={12}>
          <div
            onClick={() => setIsGroupModalOpen(true)}
            className="rounded-4 p-4  position-relative overflow-hidden shadow-sm"
            style={{
              backgroundColor: "#26B4FF",
              minHeight: "130px",
              cursor: "pointer",
              transition: "transform 0.2s, filter 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
          >
            <div
              className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2"
              style={{ width: "36px", height: "36px" }}
            >
              <i className="bi bi-plus-circle"></i>
            </div>

            <h3 className="h4 fw-bold mb-1">Create a New Group</h3>
            <p className="m-0 small">Start a new household collective</p>

            <div className="position-absolute text-white opacity-10" style={{ right: "15px", bottom: "-20px", fontSize: "90px", pointerEvents: "none" }}>
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
        </Col>
      </Row>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup className="bg-light rounded-pill border-0 px-3 py-1 shadow-sm">
          <InputGroup.Text className="bg-transparent border-0 text-secondary pe-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputGroup.Text>

          <Form.Control
            type="email"
            placeholder="Search for group by admin email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="bg-transparent border-0 shadow-none text-secondary"
            style={{ fontSize: "14px" }}
          />
        </InputGroup>
      </Form>
      <CreateGroupModal show={isGroupModalOpen} handleClose={() => setIsGroupModalOpen(false)} />
    </Container>
  )
}

export default CreateGroups

{
  /* 2. Join a Group Card */
}
{
  /* <Col xs={12}>
          <div
            onClick={handleJoinGroup}
            className="rounded-4 p-4 text-dark position-relative overflow-hidden shadow-sm"
            style={{
              backgroundColor: "#FCD12A", // Warm yellow card background
              minHeight: "130px",
              cursor: "pointer",
              transition: "transform 0.2s, filter 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
          >
            <div
              className="bg-dark bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-2"
              style={{ width: "36px", height: "36px" }}
            >
              <i className="fa-solid fa-qrcode fs-5 text-dark"></i>
            </div>

            <h3 className="h4 fw-bold mb-1 text-dark">Join a Group</h3>
            <p className="m-0 text-dark-50 small">Enter a code or scan to join</p>

            <div className="position-absolute text-dark opacity-10" style={{ right: "25px", bottom: "-15px", fontSize: "90px", pointerEvents: "none" }}>
              <i className="fa-solid fa-door-open"></i>
            </div>
          </div>
        </Col>*/
}
