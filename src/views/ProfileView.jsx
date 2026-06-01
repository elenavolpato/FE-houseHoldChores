import { Col, Container } from "react-bootstrap"
import ProfileAvatarChange from "../features/profile/ProfileAvatarChange"
import UserProfileDetails from "../features/profile/UserProfileDetails"
import NavigationBar from "../components/NavigationBar"

function ProfileView() {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column my-3">
      <Col md={6} xs={12}>
        <ProfileAvatarChange />
        <UserProfileDetails />
        <NavigationBar />
      </Col>
    </Container>
  )
}
export default ProfileView
