import { useState } from "react"
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap"

function CreateGroups() {
  const [searchEmail, setSearchEmail] = useState("")

  const handleCreateGroup = () => {
    console.log("Create a New Group clicked")
  }

  const handleJoinGroup = () => {
    console.log("Join a Group clicked")
  }

  return (
    <Container className="py-4 px-3" style={{ maxWidth: "500px" }}>
      {/* --- PAGE HEADER --- */}
      <div className="mb-4">
        <h1 className="h2 fw-bold text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>
          Manage Groups
        </h1>
        <p className="text-muted small">Stay connected and share the load.</p>
      </div>

      {/* --- CARDS CONTAINER --- */}
      <Row className="g-3 mb-4">
        {/* 1. Create a New Group Card */}
        <Col xs={12}>
          <div
            onClick={handleCreateGroup}
            className="rounded-4 p-4  position-relative overflow-hidden shadow-sm"
            style={{
              backgroundColor: "#26B4FF", // Bright blue card background
              minHeight: "130px",
              cursor: "pointer",
              transition: "transform 0.2s, filter 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
          >
            {/* Small Action Icon */}
            <div
              className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-2"
              style={{ width: "36px", height: "36px" }}
            >
              <i className="bi bi-plus-circle"></i>
            </div>

            {/* Content text */}
            <h3 className="h4 fw-bold mb-1">Create a New Group</h3>
            <p className="m-0 small">Start a new household collective</p>

            {/* Giant Semi-Transparent Watermark Background Icon */}
            <div className="position-absolute text-white opacity-10" style={{ right: "15px", bottom: "-20px", fontSize: "90px", pointerEvents: "none" }}>
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
        </Col>

        {/* 2. Join a Group Card */}
        <Col xs={12}>
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
            {/* Small Action Icon */}
            <div
              className="bg-dark bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-2"
              style={{ width: "36px", height: "36px" }}
            >
              <i className="fa-solid fa-qrcode fs-5 text-dark"></i>
            </div>

            {/* Content text */}
            <h3 className="h4 fw-bold mb-1 text-dark">Join a Group</h3>
            <p className="m-0 text-dark-50 small">Enter a code or scan to join</p>

            {/* Giant Semi-Transparent Watermark Background Icon */}
            <div className="position-absolute text-dark opacity-10" style={{ right: "25px", bottom: "-15px", fontSize: "90px", pointerEvents: "none" }}>
              <i className="fa-solid fa-door-open"></i>
            </div>
          </div>
        </Col>
      </Row>

      {/* --- SEARCH INPUT BAR --- */}
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup className="bg-light rounded-pill border-0 px-3 py-1 shadow-sm">
          {/* Magnifying Glass Search Icon */}
          <InputGroup.Text className="bg-transparent border-0 text-secondary pe-2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </InputGroup.Text>

          {/* Styled Controlled TextInput field */}
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
    </Container>
  )
}

export default CreateGroups
