import "./App.css"
import { BrowserRouter, Route, Routes /* Navigate */ } from "react-router-dom"
import LandingPage from "./views/LandingPage"
import TopBar from "./components/TopBar"
import Login from "./components/LogIn"
import Register from "./components/Register"
import DailyTasks from "./views/DailyTasks"
import CategoryTasks from "./views/CategoryTasks"
import ManageGroup from "./views/ManageGroup"

function App() {
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
        <Routes>
          <Route path="/home" element={<DailyTasks />}></Route>
        </Routes>
        <Routes>
          <Route path="/category" element={<CategoryTasks />}></Route>
        </Routes>
        <Routes>
          <Route path="/groups" element={<ManageGroup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
