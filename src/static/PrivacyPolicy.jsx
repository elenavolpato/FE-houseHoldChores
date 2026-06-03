import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useAppNavigation } from "/src/utils/useAppNavigation.jsx"

function PrivacyPolicy() {
  const { navigateTo } = useAppNavigation()

  return (
    <Container className="my-5 px-4">
      <Row className="justify-content-center">
        <Col md={12} lg={10}>
          {/* Back Button */}
          <Button variant="outline-secondary" className="mb-4 rounded-pill px-4" onClick={() => navigateTo("home")}>
            <i className="fa-solid fa-arrow-left me-2"></i> Back
          </Button>

          <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5">
            <Card.Body>
              <h1 className="fw-bold text-dark mb-2">Privacy Policy</h1>
              <p className="text-muted small mb-5">Effective Date: June 3, 2026</p>

              <p className="lead text-secondary mb-5">
                Welcome to Chores Mate ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a safe experience managing your
                household chores. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
              </p>

              <hr className="my-5 text-muted opacity-25" />

              {/* Section 1 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">1. Information We Collect</h3>
                <p className="text-secondary">
                  We collect information that you voluntarily provide to us when you register for an account, join or create a household group, or interact with
                  our services.
                </p>
                <ul className="text-secondary lh-lg">
                  <li>
                    <strong>Account Data:</strong> When you register or update your profile, we collect personal information such as your name, email address,
                    and password (which is securely hashed on our servers).
                  </li>
                  <li>
                    <strong>Household & Chore Data:</strong> To provide our core functionality, we collect data you generate within the app, including household
                    group names, assigned tasks/chores, grocery items, and completion statuses.
                  </li>
                  <li>
                    <strong>Authentication Tokens:</strong> We use local web storage to keep you securely logged into your account across browser sessions.
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">2. How We Use Your Information</h3>
                <p className="text-secondary">
                  We use the information we collect solely to run, maintain, and improve Chores Mate. Specifically, we use your data to:
                </p>
                <ul className="text-secondary lh-lg">
                  <li>Create, manage, and authenticate your user account.</li>
                  <li>Synchronize chores, grocery lists, and completion updates in real-time with other members of your designated household group.</li>
                  <li>Provide password resets and send crucial account-related notifications.</li>
                  <li>Identify, debug, and fix software errors to improve your user experience.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">3. How Your Information Is Shared</h3>
                <p className="text-secondary">
                  We respect your privacy. <strong>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</strong> Your
                  information is only shared in the following ways:
                </p>
                <ul className="text-secondary lh-lg">
                  <li>
                    <strong>With Household Members:</strong> The primary purpose of Chores Mate is collaborative coordination. Any chores you create, edit, or
                    mark complete, as well as your display name, will be visible to other authenticated users who belong to your specific household group.
                  </li>
                  <li>
                    <strong>Third-Party Hosting Infrastructure:</strong> Our application utilizes trusted third-party cloud architecture to run securely. Our
                    frontend is hosted via <strong>GitHub Pages</strong> and our backend API service is hosted via <strong>Render</strong>.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">4. Data Security</h3>
                <p className="text-secondary">
                  The security of your personal information is extremely important to us. We implement industry-standard administrative and technical security
                  measures—including password hashing and encrypted HTTPS data transmissions—to protect your personal information from unauthorized access,
                  loss, or alteration.
                </p>
                <p className="text-secondary">
                  However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot
                  guarantee its absolute security.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">5. Your Rights and Choices</h3>
                <p className="text-secondary">You have control over the personal information you store within Chores Mate:</p>
                <ul className="text-secondary lh-lg">
                  <li>
                    <strong>Account and Profile Edits:</strong> You can view and update your profile information at any time through the Profile View screen.
                  </li>
                  <li>
                    <strong>Group Associations:</strong> You have the ability to leave a household group or update group boundaries from the Manage Group panel.
                  </li>
                  <li>
                    <strong>Data Deletion:</strong> If you wish to fully remove your account or clear specific household data from our backend database
                    permanently, please contact us through the repository or support channels.
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section className="mb-5">
                <h3 className="fw-semibold text-dark mb-3">6. Changes to This Privacy Policy</h3>
                <p className="text-secondary">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and
                  updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-0">
                <h3 className="fw-semibold text-dark mb-3">7. Contact Us</h3>
                <p className="text-secondary">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us through our official project
                  repository code pathways:
                </p>
                <p className="text-secondary">
                  <strong>GitHub Project Profile:</strong>{" "}
                  <a href="https://github.com/elenavolpato" target="_blank" rel="noopener noreferrer" className="text-warning fw-semibold text-decoration-none">
                    elenavolpato <i className="fa-solid fa-arrow-up-right-from-square small ms-1"></i>
                  </a>
                </p>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PrivacyPolicy
