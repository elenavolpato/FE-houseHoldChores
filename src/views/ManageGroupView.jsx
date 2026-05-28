import { Container } from "react-bootstrap"
import CreateGroups from "@/features/groups/CreateGroups"
import GroupMembersList from "@/features/groups/GroupMemberList"
import InviteFriendsCard from "@/features/groups/InviteFriendsCard"
import NavigationBar from "@/components/NavigationBar"

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
