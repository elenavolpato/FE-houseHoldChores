import { useSelector } from "react-redux"
import { Col, Container } from "react-bootstrap"

const CATEGORY_META = {
  Cleaning: { desc: "General house cleaning tasks", icon: "broom", color: "#E53D00" },
  Groceries: { desc: "Shopping and food supplies", icon: "cart-shopping", color: "#E53D00" },
  Laundry: { desc: "Washing, drying, and folding", icon: "shirt", color: "#296EB4" },
  Garden: { desc: "Outdoor maintenance and plants", icon: "leaf", color: "#BA324F" },
  Bills: { desc: "Monthly payments and finances", icon: "money-bills", color: "#8D5A97" },
  Kitchen: { desc: "Cooking, washing dishes, and cleaning", icon: "sink", color: "#94AE89" },
  Pets: { desc: "Pets care and cleaning", icon: "paw", color: "#20063B" },
}

function CategoryHeader({ categoryName }) {
  const selectedCategory = useSelector((state) => state.chores.categories)
  const chores = useSelector((state) => state.chores.list)

  //const matchedMeta = categoriesDb.find((cat) => cat.name === categoryName)

  // 3. Fallback safely to default styles while the API finishes loading
  const currentMeta = CATEGORY_META[selectedCategory] || {
    desc: "Keep it sparkling and fresh.",
    icon: "house",
    color: "#00668F",
  }

  const activeTasksCount = chores.filter((chore) => chore.category === categoryName && !chore.isComplete).length

  return (
    <Container className="py-4">
      <Col md={8} className="mx-auto">
        <div className="d-flex align-items-center justify-content-between mb-4">
          {/* <button className="btn p-0 border-0 text-dark-navy">
            <i className="fa-solid fa-arrow-left fs-4"></i>
          </button> */}

          {/* <div className="d-flex gap-3 text-dark-navy fs-5">
            <i className="fa-solid fa-user-plus cursor-pointer"></i>
            <i className="fa-regular fa-user cursor-pointer"></i>
          </div> */}
        </div>

        {/* HERO BANNER CARD */}
        <div
          className="rounded-4 p-4 text-white position-relative overflow-hidden shadow-sm"
          style={{
            backgroundColor: "#00668F",
            minHeight: "150px",
            transition: "background-color 0.3s ease",
          }}
        >
          <span className="badge rounded-pill text-dark fw-bold px-3 py-2 mb-2" style={{ backgroundColor: "#F1C40F", fontSize: "12px" }}>
            {activeTasksCount} Active Tasks
          </span>

          <h1 className="fw-bold mb-1 fs-2">{`${categoryName} Space`}</h1>

          <p className="m-0 text-white-50 small">{currentMeta.desc}</p>

          {/* Decorative Translucent Watermark Icon in the background corner */}
          <div
            className="position-absolute opacity-10"
            style={{
              right: "20px",
              bottom: "10px",
              fontSize: "120px",
              pointerEvents: "none",
              color: "#045676",
            }}
          >
            <i className={`fa-solid fa-${currentMeta.icon}`}></i>
          </div>
        </div>
      </Col>
    </Container>
  )
}

export default CategoryHeader
