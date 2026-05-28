import "./App.css"
import { BrowserRouter, Route, Routes /* Navigate */ } from "react-router-dom"
import LandingPage from "./views/LandingPage"
import TopBar from "./components/TopBar"
import Login from "./components/LogIn"
import Register from "./components/Register"
import GroceriesView from "./views/GroceriesView"
//import DailyView from "./views/DailyView"
import WeeklyView from "./views/WeeklyView"
import CategoryView from "./views/CategoryView"
import ManageGroupView from "./views/ManageGroupView"
import AddNewTask from "./views/AddNewTaskView"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCurrentUserProfile } from "./services/authApi"

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUserProfile())
    }
  }, [token, user, dispatch])
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        {/* <Routes>
          <Route path="/home" element={<DailyView />}></Route>
        </Routes> */}
        <Routes>
          <Route path="/home" element={<WeeklyView />}></Route>
        </Routes>
        <Routes>
          <Route path="/category" element={<CategoryView />}></Route>
        </Routes>
        <Routes>
          <Route path="/groups" element={<ManageGroupView />}></Route>
        </Routes>
        <Routes>
          <Route path="/groceries" element={<GroceriesView />}></Route>
        </Routes>
        <Routes>
          <Route path="/new-task" element={<AddNewTask />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
