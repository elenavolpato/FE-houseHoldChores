import { useEffect, useState } from "react"
import { Row, Col, Card, Button, Badge, Spinner } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { fetchAvailableTasks } from "@/services/taskApi"
import ModalTaskSelection from "./ModalTaskSelection"

function PickChore() {
  const dispatch = useDispatch()

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")

  const allCategories = ["All", ...new Set(tasks.map((chore) => chore.categoryName).filter(Boolean))]
  const categoriesUsed = allCategories.filter((cat) => cat !== "Groceries")
  const filteredChores = selectedCategoryFilter === "All" ? tasks : tasks.filter((chore) => chore.categoryName === selectedCategoryFilter)

  // Modal display coordination handlers
  const [showModal, setShowModal] = useState(false)
  const [activeChore, setActiveChore] = useState(null)
  const [addedPresetIds, setAddedPresetIds] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await dispatch(fetchAvailableTasks()).unwrap()
        setTasks(data)
      } catch (err) {
        setError(err || "Failed to load household task catalog.")
      } finally {
        setLoading(false)
      }
    }
    getTasks()
  }, [dispatch])

  const handleCardClick = (chore) => {
    if (addedPresetIds.includes(chore.id)) return

    setActiveChore(chore)
    setShowModal(true)
  }

  const handleTaskAddedSuccess = (presetId) => {
    setAddedPresetIds((prev) => [...prev, presetId])
  }

  if (loading) {
    return (
      <Col xs={12} md={8} className="text-center py-5">
        <Spinner animation="border" variant="warning" className="mb-2" />
        <p className="text-muted small fw-semibold">Fetching available presets...</p>
      </Col>
    )
  }

  if (error)
    return (
      <Col xs={12} md={8}>
        <div className="alert alert-danger rounded-4 m-2">{error}</div>
      </Col>
    )

  return (
    <Col xs={12} md={8}>
      <h3 className="h5 fw-bold text-dark mb-2">Available Chores</h3>
      {/* categories filter */}
      <div className="d-flex gap-2 overflow-auto pb-3 pt-1 mb-2 no-scrollbar" style={{ whiteSpace: "nowrap" }}>
        {categoriesUsed.map((category) => {
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

      <div className="overflow-auto pe-1" style={{ maxHeight: "480px", borderRadius: "12px" }}>
        <Row className="g-2 m-0">
          {filteredChores.length === 0 ? (
            <p className="text-muted fst-italic text-center py-4 small">No tasks available in this category.</p>
          ) : (
            filteredChores.map((chore) => {
              const isAdded = addedPresetIds.includes(chore.id)

              return (
                <Col key={chore.id} xs={12} md={6} lg={4}>
                  <Card
                    className={`p-3 border-0 rounded-4 shadow-sm item-row-transition ${isAdded ? "opacity-50" : "cursor-pointer"}`}
                    onClick={() => handleCardClick(chore)}
                    style={{
                      borderLeft: `4px solid ${chore.colorCode}`,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "38px",
                            height: "38px",
                            backgroundColor: `${chore.colorCode}1A`,
                            color: chore.colorCode,
                          }}
                        >
                          <i className={`fa-solid fa-${chore.icon}`}></i>
                        </div>

                        <div>
                          <h4 className="h6 mb-0 fw-bold text-dark">{chore.title}</h4>
                          <span className="badge text-uppercase bg-light text-secondary mt-1" style={{ fontSize: "9px", letterSpacing: "0.3px" }}>
                            {chore.categoryName || "General"}
                          </span>
                        </div>
                      </div>

                      {isAdded && (
                        <Badge
                          bg="success"
                          className="rounded-pill px-2 py-1 text-uppercase fw-bold shadow-sm align-self-center"
                          style={{ fontSize: "9px", letterSpacing: "0.5px" }}
                        >
                          Added
                        </Badge>
                      )}
                    </div>
                  </Card>
                </Col>
              )
            })
          )}
        </Row>
      </div>

      {/* DUE DATE SELECTION POPUP WINDOW */}
      <ModalTaskSelection
        show={showModal}
        handleClose={() => {
          setShowModal(false)
          setActiveChore(null)
        }}
        activeChore={activeChore}
        onTaskAdded={handleTaskAddedSuccess}
      />
    </Col>
  )
}

export default PickChore
