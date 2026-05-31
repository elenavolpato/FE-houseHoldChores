import { Col, Container } from "react-bootstrap"
import "/src/css/choresStatus.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchGroupTasks, setChoreCompletionStatus } from "../../services/choreApi"

function ChoresStatus({ filterType = "all", categoryName }) {
  const dispatch = useDispatch()

  // Grab states from Redux
  const chores = useSelector((state) => state.chores.list)
  const reduxCategory = useSelector((state) => state.chores.selectedCategory)
  const activeCategory = categoryName || reduxCategory

  const weekStart = useSelector((state) => state.chores.weekStartIso)
  const weekEnd = useSelector((state) => state.chores.weekEndIso)

  useEffect(() => {
    dispatch(fetchGroupTasks({ startDate: weekStart, endDate: weekEnd }))
  }, [dispatch, weekStart, weekEnd])

  // filter local display dataset
  let displayChores = chores
  console.log(chores)

  if (filterType === "category") {
    displayChores = chores.filter((chore) => {
      const nameToCheck = typeof chore.category === "object" ? chore.category?.name : chore.category
      return nameToCheck === activeCategory
    })
  }

  // separate by task complete attributes
  const remainingChores = displayChores.filter((chore) => !chore.isCompleted)
  const completedChores = displayChores.filter((chore) => chore.isCompleted)

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
              const uiColor = chore.colorCode || "#6c757d"
              const uiIcon = chore.icon || "thumbtack"
              const catName = chore.categoryName || "GENERAL"

              return (
                <div
                  key={chore.taskId}
                  className="d-flex align-items-center justify-content-between bg-white p-3 rounded-3 shadow-sm"
                  style={{
                    transition: "transform 0.2s",
                    borderLeft: `4px solid ${uiColor}`,
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    {/* Round Icon Container */}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        color: uiColor,
                        backgroundColor: `${uiColor}1A`,
                      }}
                    >
                      <i className={`fa-solid fa-${uiIcon} fs-4`}></i>
                    </div>

                    {/* Title & Category Badge */}
                    <div>
                      <h4 className="h5 text-dark mb-1 fw-normal">{chore.title}</h4>
                      <span className="badge text-uppercase px-2 py-1 bg-light text-dark fw-lighter" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                        {catName}
                      </span>
                    </div>
                  </div>

                  {/* Checkbox Control */}
                  <label className="position-relative d-flex align-items-center" style={{ cursor: "pointer" }}>
                    <input
                      className="visually-hidden chore-checkbox"
                      type="checkbox"
                      checked={chore.isCompleted}
                      onChange={() => dispatch(setChoreCompletionStatus(chore.taskId))}
                    />

                    {/* Visual Custom Circle */}
                    <div className="rounded-circle border border-2 border-secondary-subtle checkbox-visual" style={{ width: "32px", height: "32px" }}></div>
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
          completedChores.map((chore) => {
            const uiIcon = chore.icon || "thumbtack"
            const catName = chore.categoryName || "GENERAL"

            return (
              <div key={chore.taskId} className="d-flex align-items-center justify-content-between bg-light p-3 rounded-3 opacity-75 mb-3">
                <div className="d-flex align-items-center gap-3">
                  {/* Icon Container */}
                  <div
                    className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <i className={`fa-solid fa-${uiIcon} text-secondary`}></i>
                  </div>

                  {/* Text and Badge */}
                  <div>
                    <h4 className="h5 text-secondary text-decoration-line-through mb-0">{chore.title}</h4>
                    <span className="badge text-uppercase px-2 py-1 bg-light text-dark fw-lighter" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                      {catName || "General"}
                    </span>
                  </div>
                </div>

                {/* Checkmark Container */}
                <label className="position-relative d-flex align-items-center cursor-pointer" style={{ cursor: "pointer" }}>
                  <input
                    className="visually-hidden chore-checkbox"
                    type="checkbox"
                    checked={chore.isCompleted}
                    onChange={() => dispatch(setChoreCompletionStatus(chore.taskId))}
                  />
                  <div
                    className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-dark"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                </label>
              </div>
            )
          })
        )}
      </Col>
    </Container>
  )
}

export default ChoresStatus
