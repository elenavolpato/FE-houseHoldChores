import { Button, Container } from "react-bootstrap"
import "/src/css/bottomCallToAction.css"
import { useAppNavigation } from "/src/utils/useAppNavigation"

function BottomCallToAction() {
  const { navigateTo } = useAppNavigation()
  return (
    <>
      <div className="d-flex align-items-center justify-content-center py-5 mx-2 bg-light">
        <div className="cta-section z-0 d-flex align-items-center justify-content-center p-5">
          <div className="circle-left"></div>
          <div className="circle-right"></div>

          <Container className="cta-content z-1 text-light d-flex align-items-center flex-column justify-content-evenly position-relative py-3">
            <h3 className=" text-light z-10 h4 pt-3">Start managing your household efficiently today</h3>
            <p>Join us by using ChoreMate to maintain balance and clarity in your daily routines.</p>
            <div className="d-md-flex gap-3 mt-4 d-block">
              <Button className="btn-primary-custom  mb-3 mb-md-0" onClick={() => navigateTo("register")}>
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
