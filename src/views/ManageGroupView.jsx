import { Col, Container } from "react-bootstrap"
import GroupMembersList from "@/features/groups/GroupMemberList"
import InviteFriendsCard from "@/features/groups/InviteFriendsCard"
import NavigationBar from "@/components/NavigationBar"
import CreateGroups from "../features/groups/CreateGroups"
import { useSelector } from "react-redux"

function ManageGroup() {
  const groupId = useSelector((state) => state.auth.user?.groupId)
  const hasGroup = Boolean(groupId)

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column mt-3 mb-5 pb-5">
      <Col md={6}>
        {/* create groups only shows when user has no groups yet */}
        {!hasGroup && (
          <>
            <CreateGroups />{" "}
          </>
        )}
        {/* member list only show when user is already in a group */}
        {hasGroup && (
          <>
            <GroupMembersList />
            <InviteFriendsCard />
          </>
        )}
      </Col>
      <NavigationBar variant="mobile" />
    </Container>
  )
}

export default ManageGroup
