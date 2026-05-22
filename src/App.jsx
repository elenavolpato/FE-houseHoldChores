import "./App.css"
import { BrowserRouter, Route, Routes /* Navigate */ } from "react-router-dom"
import Home from "./views/Home"
import TopBar from "./components/TopBar"

function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
