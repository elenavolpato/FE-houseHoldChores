import { useState } from "react"
import { Container, Spinner, Card, Col } from "react-bootstrap"
import InviteMembers from "./InviteMembers"

function SearchGroupByEmail() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState(null)

  return (
    <Container className="mt-3">
      <InviteMembers placeholder="Search group by admin's email" onLoadingChange={setIsLoading} onSearchResult={setSearchResult} />

      {searchResult && (
        <Col className="mt-4">
          Group
          {isLoading && (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          {!isLoading && (
            <Card key={searchResult.id} className="border-0 shadow-sm rounded-4 bg-white">
              <Card.Body className="p-3 d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="h6 fw-bold mb-0 text-dark">{searchResult.groupName}</h4>
                  <span className="text-muted small" style={{ fontSize: "13px" }}></span>
                </div>
                <div className="d-flex align-items-center gap-3"></div>

                <span
                  className="fw-bold tracking-wider"
                  style={{
                    fontSize: "12px",
                    color: "#005580",
                    letterSpacing: "0.5px",
                  }}
                >
                  Join
                </span>
              </Card.Body>
            </Card>
          )}
        </Col>
      )}
    </Container>
  )
}
export default SearchGroupByEmail
