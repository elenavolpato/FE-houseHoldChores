import { Container, Col, Spinner, Card } from "react-bootstrap"
import InputSearchByEmail from "./InputSearchByEmail"
import { useState } from "react"

function InviteFriendsCard() {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [searchResult, setSearchResult] = useState(null)

  return (
    <Col className="py-3 mt-4">
      <div
        className="rounded-4 p-4 text-center d-flex flex-column align-items-center"
        style={{
          backgroundColor: "#FFF2F2",
          border: "2px dashed #FF8A8A",
        }}
      >
        {/* Floating Coral Share Circle Button Icon */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center text-white mb-3 shadow-sm"
          style={{
            backgroundColor: "#FF7A5A",
            width: "56px",
            height: "56px",
          }}
        >
          <i className="fa-solid fa-people-roof fs-4"></i>
        </div>

        {/* Dynamic Promotional Subtext Details */}
        <h2 className="h4 fw-bold mb-3" style={{ color: "#9E2A2B" }}>
          Invite more friends to your group
        </h2>

        <div className="d-flex w-100 justify-content-between">
          <Col xs={12}>
            <InputSearchByEmail placeholder={"Email"} onLoadingChange={setIsLoading} onResponse={searchResult} isInvite={true} />
          </Col>
        </div>
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
                    <h4 className="h6 fw-bold mb-0 text-dark">{searchResult}</h4>
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
        {/* Core Direct Copy Target CTA Trigger Button */}
        {/*  <Button
          onClick={handleCopyLink}
          className="w-100 py-2 border-0 rounded-pill fw-bold"
          style={{
            backgroundColor: "#1E6B8F",
            color: "#FFFFFF",
            maxWidth: "260px",
            fontSize: "15px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16526E")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1E6B8F")}
        >
          Copy Invite Link
        </Button> */}
      </div>
    </Col>
  )
}

export default InviteFriendsCard
