import { useState } from "react"
import { Form, Alert, Container, InputGroup, Col } from "react-bootstrap"
import { createGroup } from "@/services/groupApi"
import { useAppNavigation } from "@/utils/useAppNavigation"
import { useDispatch } from "react-redux"

function CreateGroupName() {
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState("")
  const { navigateTo } = useAppNavigation()

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    try {
      await dispatch(createGroup(groupName)).unwrap()
      alert("Household created successfully!")
      setGroupName("")
      navigateTo("new-task")
    } catch (backendError) {
      setError(backendError || "Failed to create group.")
    }
  }

  return (
    <Container className="mt-3">
      {error && (
        <Alert variant="danger" className="py-2 px-3 rounded-3 mb-3">
          {error}{" "}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="d-flex gap-2 ">
        <Col xs={8}>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          </InputGroup>
        </Col>
        <Col xs={4}>
          <button className="btn btn-warning px-3 rounded-pill fw-medium" type="submit">
            Create Group
          </button>
        </Col>
      </Form>
    </Container>
  )
}

export default CreateGroupName
