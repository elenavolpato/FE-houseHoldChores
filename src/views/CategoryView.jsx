import { Container, Nav } from "react-bootstrap"
import ChoresStatus from "@/features/chores/ChoresStatus"
import { useSelector, useDispatch } from "react-redux"
import { setSelectedCategory } from "@/redux/choresSlice"
import ChoreActionButtons from "@/features/chores/ChoreActionButtons"
import NavigationBar from "@/components/NavigationBar"
import CategoryHeader from "@/features/category/CategoryHeader"
const AVAILABLE_CATEGORIES = ["Kitchen", "Cleaning", "Pets", "Groceries", "Laundry", "Garden", "Bills"]

function CategoryTasks() {
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state) => state.chores.selectedCategory)

  const handleCategoryClick = (categoryName) => {
    dispatch(setSelectedCategory(categoryName))
  }

  return (
    <Container className="py-3">
      <Nav
        variant="tabs"
        activeKey={selectedCategory}
        onSelect={handleCategoryClick}
        className="mb-3 border-0 d-flex flex-nowrap overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {AVAILABLE_CATEGORIES.map((cat) => (
          <Nav.Item key={cat}>
            <Nav.Link
              eventKey={cat}
              className={`rounded-pill px-4 py-2 me-2 border-0 fw-bold transition-all ${
                selectedCategory === cat ? "bg-dark-navy text-white shadow-sm" : "bg-white text-secondary hover-bg-light border"
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? "#001F3F" : "#FFF",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <CategoryHeader categoryName={selectedCategory} />
      <ChoresStatus filterType="category" categoryName={selectedCategory} />
      <ChoreActionButtons />
      <NavigationBar variant="mobile" />
    </Container>
  )
}

export default CategoryTasks
