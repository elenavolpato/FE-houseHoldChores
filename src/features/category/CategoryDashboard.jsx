// src/components/CategoryDashboard.jsx
import { useDispatch } from "react-redux"
import { setSelectedCategory } from "@/redux/choresSlice"

// Mock array of user options for UI grid
const CHORE_CATEGORIES = ["Cleaning", "Groceries", "Laundry", "Garden", "Bills", "Kitchen", "Pets"]

function CategoryDashboard({ onViewChange }) {
  const dispatch = useDispatch()

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category))

    if (onViewChange) onViewChange("categoryView")
  }

  return (
    <div className="container py-4 text-center">
      <h3 className="mb-4 text-dark-navy fw-bold">Select a Category</h3>
      <div className="row g-3 justify-content-center">
        {CHORE_CATEGORIES.map((cat) => (
          <div key={cat} className="col-6 col-md-3">
            <div
              onClick={() => handleCategorySelect(cat)}
              className="p-4 bg-white rounded-4 shadow-sm border border-light cursor-pointer hover-card"
              style={{ cursor: "pointer" }}
            >
              <h5 className="m-0 text-dark-navy fw-bold">{cat}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDashboard
