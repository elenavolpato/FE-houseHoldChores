import { Container, Row, Col, Button } from "react-bootstrap"

function ChoreActionButtons() {
  const handleAddTask = () => {
    console.log("Add a New Task clicked")
  }

  const handleCreateCategory = () => {
    console.log("Create a New Category clicked")
  }

  return (
    <Container className="my-4 px-3">
      {/* Row settings:
        - g-3 adds consistent spacing (gutters) between columns vertical and horizontal
        - justify-content-center centers the buttons inside larger desktop containers
      */}
      <Row className="g-3 justify-content-center max-width-container">
        {/* "Add a New Task" Button Column */}
        <Col xs={12} md={6} lg={4}>
          <Button
            onClick={handleAddTask}
            className="w-100 d-flex align-items-center justify-content-center py-3 border-0 rounded-4 shadow-sm fw-bold fs-5"
            style={{
              backgroundColor: "#00668F",
              color: "#FFFFFF",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005578")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00668F")}
          >
            {/* FontAwesome Plus Circle Icon */}
            <i className="fa-solid fa-circle-plus me-2 fs-4"></i>
            Add a New Task
          </Button>
        </Col>

        {/* "Create a New Category" Button Column */}
        <Col xs={12} md={6} lg={4}>
          <Button
            onClick={handleCreateCategory}
            variant="outline-info"
            className="w-100 d-flex align-items-center justify-content-center py-3 rounded-4 shadow-sm fw-bold fs-5 bg-white"
            style={{
              borderColor: "#00668F",
              color: "#00668F",
              borderWidth: "2px",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F4F9FC"
              e.currentTarget.style.borderColor = "#005578"
              e.currentTarget.style.color = "#005578"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF"
              e.currentTarget.style.borderColor = "#00668F"
              e.currentTarget.style.color = "#00668F"
            }}
          >
            {/* FontAwesome Grid-Plus Icon */}
            <i className="fa-solid fa-table-cells-large me-2 fs-5"></i>
            Create a New Category
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ChoreActionButtons
