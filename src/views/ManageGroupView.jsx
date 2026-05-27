import { Container } from "react-bootstrap"
import CreateGroups from "../components/CreateGroup"
import GroupMembersList from "../components/GroupMemberList"
import InviteFriendsCard from "../components/InviteFriendsCard"
import NavigationBar from "../components/NavigationBar"

function ManageGroup() {
  return (
    <Container>
      <CreateGroups />
      <GroupMembersList />
      <InviteFriendsCard />
      <NavigationBar variant="mobile" />
    </Container>
  )
}

export default ManageGroup
