import { Col, Container, ProgressBar /*  Button, Form  */ } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toggleGrocery /* addGrocery */ } from "@/redux/choresSlice"
import "/src/css/groceriesList.css"

function GroceriesList() {
  const dispatch = useDispatch()
  //const [newItemName, setNewItemName] = useState("")

  // Grab data dynamically from Redux
  const groceries = useSelector((state) => state.chores.groceriesList) || []
  const groupName = useSelector((state) => state.chores.groupName) || "Your group"

  // Metrics calculation
  const totalItems = groceries.length
  const completedItems = groceries.filter((item) => item.isComplete).length
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  /* const handleAddItemSubmit = (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    dispatch(addGrocery(newItemName))
    setNewItemName("")
  } */

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        {/* --- HEADER TITLE SECTION --- */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1 h3">Groceries list</h2>
          <div className="d-flex align-items-center justify-content-between">
            <span className="text-muted small">{groupName}</span>
          </div>
        </div>

        {/* --- PROGRESS CARD WIDGET --- */}
        <div className="grocery-progress-card p-3 rounded-4 bg-white mb-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold text-dark text-opacity-75">Shopping Progress</span>
            <span className="fw-bold progress-percentage-text">{progressPercent}%</span>
          </div>
          <ProgressBar now={progressPercent} className="grocery-progress-track" />
        </div>

        {/* --- MAIN GROCERY CARDS STREAM (No Category Groupings) --- */}
        <div className="d-flex flex-column gap-3 mb-4">
          {groceries.length === 0 ? (
            <p className="text-muted fst-italic py-2">The grocery list is clear!</p>
          ) : (
            groceries.map((item) => (
              <div
                key={item.id}
                className={`d-flex align-items-center justify-content-between bg-white p-3 rounded-4 shadow-sm item-row-transition ${item.isComplete ? "opacity-50" : ""}`}
              >
                <div className="d-flex align-items-center gap-3">
                  {/* Circular Interactive Checkbox */}
                  <label className="checkbox-round-container">
                    <input type="checkbox" checked={item.isComplete} onChange={() => dispatch(toggleGrocery(item.id))} />
                    <span className="checkmark-circle">
                      <i className="fa-solid fa-check check-icon"></i>
                    </span>
                  </label>

                  {/* Descriptive labels */}
                  <div>
                    <h4 className={`h6 mb-1 fw-semibold text-dark ${item.isComplete ? "text-decoration-line-through text-muted" : ""}`}>{item.name}</h4>
                    <span className="text-muted small d-block">{item.quantity}</span>
                  </div>
                </div>

                {/* Priority Indicator Pill */}
                {item.isHighPriority && !item.isComplete && (
                  <span className="badge priority-pill text-dark px-3 py-2 rounded-pill fw-semibold">High Priority</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* --- QUICK INPUT ADD ACTION FOOTER --- */}
        {/* <Form onSubmit={handleAddItemSubmit} className="d-flex align-items-center bg-white p-2 rounded-4 shadow-sm border">
          <Form.Control
            type="text"
            placeholder="Quick add (e.g. Eggs 1 dozen)"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border-0 shadow-none bg-transparent ps-3"
          />
          <Button type="submit" className="add-action-circle-btn rounded-circle p-0 d-flex align-items-center justify-content-center">
            <i className="fa-solid fa-plus fs-5"></i>
          </Button>
        </Form> */}
      </Col>
    </Container>
  )
}

export default GroceriesList
