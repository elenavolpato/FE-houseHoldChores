import { useState } from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleChore } from "../redux/choresSlice"

function PickChore() {
  const dispatch = useDispatch()

  // Pull the complete array stream straight from Redux
  const choresList = useSelector((state) => state.chores.list) || []

  // Local state to manage the active category filter text
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")

  // 1. Dynamically extract unique categories present inside your Redux chores list
  const categories = ["All", ...new Set(choresList.map((chore) => chore.category))]

  // 2. Filter the tasks stream depending on what filter button is pressed
  const filteredChores = selectedCategoryFilter === "All" ? choresList : choresList.filter((chore) => chore.category === selectedCategoryFilter)

  return (
    <Col xs={12} md={8}>
      <h3 className="h5 fw-bold text-dark mb-2">Available Chores </h3>

      {/* --- DYNAMIC CATEGORIES FILTER ROW --- */}
      <div className="d-flex gap-2 overflow-auto pb-3 pt-1 mb-2 no-scrollbar" style={{ whiteSpace: "nowrap" }}>
        {categories.map((category) => {
          const isActive = selectedCategoryFilter === category
          return (
            <Button
              key={category}
              variant="none"
              onClick={() => setSelectedCategoryFilter(category)}
              className={`px-3 py-1 rounded-pill fw-semibold btn-sm transition-all border ${
                isActive ? "bg-warning border-warning text-dark shadow-sm fw-bold" : "bg-white border-light-subtle text-secondary"
              }`}
              style={{ transition: "all 0.15s ease" }}
            >
              {category}
            </Button>
          )
        })}
      </div>

      {/* --- SCROLLABLE CONTAINER CONSTRAINT --- */}
      <div className="overflow-auto pe-1" style={{ maxHeight: "480px", borderRadius: "12px" }}>
        <Row className="g-2 m-0">
          {filteredChores.length === 0 ? (
            <p className="text-muted fst-italic text-center py-4 small">No tasks available in this category.</p>
          ) : (
            filteredChores.map((chore) => {
              return (
                <Col key={chore.id} xs={12} md={6} lg={4}>
                  <Card
                    className={`p-3 border-0 rounded-4 shadow-sm cursor-pointer item-row-transition ${chore.isComplete ? "opacity-50" : ""}`}
                    onClick={() => dispatch(toggleChore(chore.id))}
                    style={{
                      borderLeft: `4px solid ${chore.color}`,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        {/* Icon Element Splash */}
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "38px",
                            height: "38px",
                            backgroundColor: `${chore.color}1A`,
                            color: chore.color,
                          }}
                        >
                          <i className={`fa-solid fa-${chore.icon || "circle-check"}`}></i>
                        </div>

                        <div>
                          <h4 className={`h6 mb-0 fw-bold text-dark ${chore.isComplete ? "text-decoration-line-through text-muted" : ""}`}>{chore.name}</h4>
                          <span className="badge text-uppercase bg-light text-secondary mt-1" style={{ fontSize: "9px", letterSpacing: "0.3px" }}>
                            {chore.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            })
          )}
        </Row>
      </div>
    </Col>
  )
}

export default PickChore
