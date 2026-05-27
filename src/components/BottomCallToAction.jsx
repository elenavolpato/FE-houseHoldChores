import { Button, Container } from "react-bootstrap"
import "../css/bottomCallToAction.css"
import { useAppNavigation } from "../utils/useAppNavigation"

function BottomCallToAction() {
  const { navigateTo } = useAppNavigation()
  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-5 mx-2 bg-light">
        <div className="cta-section z-0 d-flex align-items-center justify-content-center">
          <div className="circle-left"></div>
          <div className="circle-right"></div>

          <Container className="cta-content z-1 text-light d-flex align-items-center flex-column justify-content-evenly position-relative ">
            <h3 className=" text-light z-10">Start managing your LandingPage efficiently today</h3>
            <p>Join over 10,000 households using ChoreMate to maintain balance and clarity in their daily routines.</p>
            <div className="d-flex gap-3 mt-4">
              <Button className="btn-primary-custom" onClick={() => navigateTo("register")}>
                Get started free
              </Button>
              <Button className="btn-outline-custom" onClick={() => navigateTo("login")}>
                Login to account
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}

export default BottomCallToAction
