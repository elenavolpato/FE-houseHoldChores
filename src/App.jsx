import "@/App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import LandingPage from "@/views/LandingPage"
import TopBar from "@/components/TopBar"
import Login from "@/features/auth/LogIn"
import Register from "@/features/auth/Register"
import GroceriesView from "@/views/GroceriesView"
import WeeklyView from "@/views/WeeklyView"
import ManageGroupView from "@/views/ManageGroupView"
import AddNewTask from "@/views/AddNewTaskView"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCurrentUserProfile } from "@/services/authApi"
import ResetPassword from "./features/auth/ResetPassword"
import ForgotPassword from "./features/auth/ForgotPassword"
import ProfileView from "./views/ProfileView"

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/" replace />
  }
  return children
}

const PublicRoute = ({ token, children }) => {
  if (token) {
    return <Navigate to="/home" replace />
  }
  return children
}

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
    <BrowserRouter>
      <TopBar />
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <PublicRoute token={token}>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute token={token}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute token={token}>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register-with-invite" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        {/* Require valid !token validation check */}
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <WeeklyView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute token={token}>
              <ManageGroupView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groceries"
          element={
            <ProtectedRoute token={token}>
              <GroceriesView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/new-task"
          element={
            <ProtectedRoute token={token}>
              <AddNewTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/me"
          element={
            <ProtectedRoute token={token}>
              <ProfileView />
            </ProtectedRoute>
          }
        />

        {/* Wildcard Fallback redirect */}
        <Route path="*" element={<Navigate to={token ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
