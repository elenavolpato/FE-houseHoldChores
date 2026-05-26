import { Container, Card } from "react-bootstrap"
import GroupHeader from "./GroupHeader"

function GroupMembersList() {
  // Mock data representing members fetched from your state/backend
  const members = [
    {
      id: 1,
      name: "Alex Miller",
      email: "alex.m@flat.com",
      role: "ADMIN",
      avatar: "https://i.pravatar.cc/150?img=11", // Replace with real asset paths
      isAdmin: true,
    },
    {
      id: 2,
      name: "Sarah Klein",
      email: "sarah.k@flat.com",
      role: "MEMBER",
      avatar: "https://i.pravatar.cc/150?img=47",
      isAdmin: false,
    },
    {
      id: 3,
      name: "Jordan Taylor",
      email: "j.taylor@flat.com",
      role: "MEMBER",
      avatar: "https://i.pravatar.cc/150?img=12",
      isAdmin: false,
    },
  ]

  return (
    <Container className="py-3 px-3" style={{ maxWidth: "500px" }}>
      {/* GROUP TITLE HEADER HEADER LAYER */}
      <GroupHeader />

      {/* MEMBERS LOOP STACK */}
      <div className="d-flex flex-column gap-3">
        {members.map((member) => (
          <Card key={member.id} className="border-0 shadow-sm rounded-4 bg-white">
            <Card.Body className="p-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                {/* Avatar Wrapper Container */}
                <div className="position-relative">
                  <img src={member.avatar} alt={member.name} className="rounded-circle object-fit-cover" style={{ width: "54px", height: "54px" }} />
                  {/* Admin Yellow Star Badge Overlay */}
                  {member.isAdmin && (
                    <span
                      className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        backgroundColor: "#FFD700",
                        width: "20px",
                        height: "20px",
                        border: "2px solid #FFF",
                        fontSize: "10px",
                      }}
                    >
                      <i className="fa-solid fa-star text-white"></i>
                    </span>
                  )}
                </div>

                {/* User Identity Info Blocks */}
                <div>
                  <h4 className="h6 fw-bold mb-0 text-dark">{member.name}</h4>
                  <span className="text-muted small" style={{ fontSize: "13px" }}>
                    {member.email}
                  </span>
                </div>
              </div>

              {/* Role Indicator Text Label */}
              <span
                className="fw-bold tracking-wider"
                style={{
                  fontSize: "12px",
                  color: member.isAdmin ? "#005580" : "#5C6B73",
                  letterSpacing: "0.5px",
                }}
              >
                {member.role}
              </span>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default GroupMembersList
