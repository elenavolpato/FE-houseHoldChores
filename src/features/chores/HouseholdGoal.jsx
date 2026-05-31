import { Card, Col, ProgressBar } from "react-bootstrap"
import { useSelector } from "react-redux"
import "/src/css/houseHoldGoal.css"

const HouseholdGoal = () => {
  //  states from Redux
  const chores = useSelector((state) => state.chores.list)

  // filter list based on active tab before calculating percentages
  const completedTasks = chores.filter((chore) => chore.isCompleted).length
  const totalTasks = chores.length
  const percentageDone = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const motivationalText = percentageDone === 100 ? "Amazing job!" : "Keep going!"

  return (
    <Col md={8} xs={12} className="mb-3">
      <Card className="goal-card border-0 mx-auto ">
        <Card.Body className="p-4">
          <h3 className="goal-title fw-bold mb-1 text-dark">Household Goal</h3>

          <p className="goal-subtitle text-muted mb-4">
            {completedTasks} of {totalTasks} tasks completed this week
          </p>

          <ProgressBar now={percentageDone} className="goal-progress-bar mb-3" />

          <div className="d-flex justify-content-between align-items-center">
            <span className="goal-action-text fw-bold">{motivationalText}</span>
            <span className="goal-percentage fw-bold text-dark">{percentageDone}% Done</span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default HouseholdGoal
