import { useState } from "react"
import { Container, Col } from "react-bootstrap"
import CreateGroupName from "./CreateGroupName"
//import SearchGroupByEmail from "./SearchGroupByEmail"
import NoGroups from "./NoGroups"

function CreateGroups() {
  const [showAddName, setShowAddName] = useState(false)
  //const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <Container className="pt-4 px-3 d-flex flex-column align-items-center">
      <NoGroups />
      <Col xs={12}>
        <div
          onClick={() => setShowAddName(true)}
          className="rounded-4 p-4  position-relative overflow-hidden shadow-sm mb-4 bg-light"
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
        >
          <div className="d-flex gap-3 align-items-center">
            <div className="icon-bg rounded-3 p-3">
              <i className="fa-solid fa-house-circle-check fs-3 text-navy"></i>
            </div>
            <div>
              <h4 className="h4 fw-bolder mb-0 text-light-navy"> Create a Group</h4>
              <p className="m-0 small ">Start a new household collective</p>
            </div>
          </div>
          {showAddName && <CreateGroupName />}
        </div>
        {/* <div
          onClick={() => setShowSearchBar(true)}
          className="rounded-4 p-4  position-relative overflow-hidden shadow-sm mb-4 bg-light"
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
        >
          <div className="d-flex gap-3 align-items-center">
            <div className="icon-bg-yellow rounded-3 p-3">
              <i className="fa-solid fa-magnifying-glass fs-3 text-gold"></i>
            </div>
            <div>
              <h4 className="h4 fw-bolder mb-0 text-gold"> Find a group</h4>
              <p className="m-0 small ">Join by admin email address</p>
            </div>
          </div>
          {showSearchBar && <SearchGroupByEmail />}
        </div> */}
      </Col>

      {/*  <div className="bg-light-gray rounded-3 p-3 d-flex align-items-center gap-2">
        <i className="fa-solid fa-circle-info text-info fs-4"></i>
        <span>Tip: You can invite roommates or family members after creating a group.</span>
      </div> */}
    </Container>
  )
}

export default CreateGroups

{
  /* 2. Join a Group Card */
}
{
  /* */
}
