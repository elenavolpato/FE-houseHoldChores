import { Col, Container } from "react-bootstrap"
import "../css/choresStatus.css"
import { toggleChore } from "../redux/choresSlice"
import { useDispatch, useSelector } from "react-redux"

function ChoresStatus({ filterType = "all", categoryName }) {
  const dispatch = useDispatch()

  // Grab state from Redux
  const chores = useSelector((state) => state.chores.list)
  const reduxCategory = useSelector((state) => state.chores.selectedCategory)
  const activeCategory = categoryName || reduxCategory

  // 1. First layer of filtering: Decide if we filter by Category or show Dashboard view
  const displayChores = filterType === "category" ? chores.filter((chore) => chore.category === activeCategory) : chores

  const remainingChores = displayChores.filter((chore) => !chore.isComplete)
  const completedChores = displayChores.filter((chore) => chore.isComplete)

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        {/* --- REMAINING CHORES SECTION --- */}
        <h3 className="h5 text-dark fw-bold mb-3">Remaining Chores</h3>
        <div className="d-flex flex-column gap-3 mb-4">
          {remainingChores.length === 0 ? (
            <p className="text-muted fst-italic">No remaining chores!</p>
          ) : (
            remainingChores.map((chore) => {
              return (
                <div
                  key={chore.id}
                  className="d-flex align-items-center justify-content-between bg-white p-3 rounded-3 shadow-sm "
                  style={{
                    transition: "transform 0.2s",
                    borderLeft: `4px solid ${chore.color}`, // Dynamically sets the side accent color
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    {/* Round Icon Container */}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        color: chore.color, // Sets the icon color
                        backgroundColor: `${chore.color}1A`, // '1A' for a 10% opacity background splash
                      }}
                    >
                      <i className={`fa-solid fa-${chore.icon} fs-4`}></i>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="h5 text-dark mb-1 fw-normal">{chore.name}</h4>
                      <span className="badge text-uppercase px-2 py-1 bg-light text-dark fw-lighter" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                        {chore.category}
                      </span>
                    </div>
                  </div>

                  {/* Empty Visual Checkbox Control */}
                  <label className="position-relative d-flex align-items-center" style={{ cursor: "pointer" }}>
                    <input className="visually-hidden" type="checkbox" checked={chore.isComplete} onChange={() => dispatch(toggleChore(chore.id))} />
                    {/* Gray circular border acting as the empty checkbox */}
                    <div className="rounded-circle border border-2 border-secondary-subtle" style={{ width: "32px", height: "32px" }}></div>
                  </label>
                </div>
              )
            })
          )}
        </div>

        {/* --- COMPLETED CHORES SECTION --- */}
        <h3 className="text-secondary mb-3 font-semibold text-lg">Completed Chores</h3>
        {completedChores.length === 0 ? (
          <p className="text-gray-400 italic">No completed chores yet.</p>
        ) : (
          completedChores.map((chore) => (
            <div className="d-flex align-items-center justify-content-between bg-light p-3 rounded-3 opacity-75 mb-3">
              <div className="d-flex align-items-center gap-3">
                {/* Icon Container */}
                <div
                  key={chore.id}
                  className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className={`fa-solid fa-${chore.icon}`}></i>
                </div>

                {/* Text and Badge */}
                <div>
                  <h4 className="h5 text-secondary text-decoration-line-through mb-0">{chore.name}</h4>
                  <span className="badge text-uppercase px-2 py-1 bg-light text-dark fw-lighter" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                    {chore.category}
                  </span>
                </div>
              </div>

              {/* Checkmark Container */}
              <label className="position-relative d-flex align-items-center cursor-pointer">
                {/* The actual checkbox is hidden but handles the click/state change */}
                <input className="visually-hidden" type="checkbox" checked={chore.isComplete} onChange={() => dispatch(toggleChore(chore.id))} />

                {/* Visual Yellow Round Button */}
                <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-dark" style={{ width: "32px", height: "32px" }}>
                  <i class="fa-solid fa-check"></i>
                </div>
              </label>
            </div>
          ))
        )}
      </Col>
    </Container>
  )
}

export default ChoresStatus
