import "./App.css"
import { BrowserRouter, Route, Routes /* Navigate */ } from "react-router-dom"
import LandingPage from "./views/LandingPage"
import TopBar from "./components/TopBar"
import Login from "./components/LogIn"
import Register from "./components/Register"
import DailyTasks from "./views/DailyTasks"

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
      </BrowserRouter>
    </>
  )
}

export default App
