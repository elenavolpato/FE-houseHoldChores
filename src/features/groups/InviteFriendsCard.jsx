import { Container, Button } from "react-bootstrap"

function InviteFriendsCard() {
  const handleCopyLink = () => {
    // Basic browser clipboard action hook
    navigator.clipboard.writeText("https://sunnysideflat.yourchoresapp.com/join/12345")
    alert("Invite link copied directly to clipboard!")
  }

  return (
    <Container className="py-3 px-3" style={{ maxWidth: "500px" }}>
      <div
        className="rounded-4 p-4 text-center d-flex flex-column align-items-center"
        style={{
          backgroundColor: "#FFF2F2", // Soft pastel pink/red accent fill
          border: "2px dashed #FF8A8A", // Soft red dashed outer track border line
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
          <i className="fa-solid fa-share-nodes fs-4"></i>
        </div>

        {/* Dynamic Promotional Subtext Details */}
        <h2 className="h4 fw-bold mb-1" style={{ color: "#9E2A2B" }}>
          Invite more friends
        </h2>
        <p className="text-muted small mb-4">
          Sharing chores is <strong>2x faster!</strong>
        </p>

        {/* Core Direct Copy Target CTA Trigger Button */}
        <Button
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
        </Button>
      </div>
    </Container>
  )
}

export default InviteFriendsCard
