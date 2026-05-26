import { Container } from "react-bootstrap"
import CreateGroups from "../components/CreateGroup"
import GroupMembersList from "../components/GroupMemberList"
import InviteFriendsCard from "../components/InviteFriendsCard"

function ManageGroup() {
  return (
    <Container>
      <CreateGroups />
      <GroupMembersList />
      <InviteFriendsCard />
    </Container>
  )
}

export default ManageGroup
