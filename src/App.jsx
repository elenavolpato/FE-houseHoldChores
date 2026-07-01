import "@/App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import LandingPage from "@/views/LandingPage"
import TopBar from "@/components/TopBar"
import Login from "@/features/auth/LogIn"
import Register from "@/features/auth/Register"
//import GroceriesView from "@/views/GroceriesView"
import WeeklyView from "@/views/WeeklyView"
import ManageGroupView from "@/views/ManageGroupView"
import AddNewTask from "@/views/AddNewTaskView"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCurrentUserProfile } from "@/services/authApi"
import ResetPassword from "./features/auth/ResetPassword"
import ForgotPassword from "./features/auth/ForgotPassword"
import ProfileView from "./views/ProfileView"
import { Spinner } from "react-bootstrap"
import PrivacyPolicy from "./static/PrivacyPolicy"

const PublicRoute = ({ token, user, isProfileLoading, children }) => {
  if (token) {
    // Still waiting for profile to resolve
    if (isProfileLoading) return <Spinner variant="warning" className="standard-spinner" />
    // Profile fetch done — redirect if we have a user
    if (user) return <Navigate to={user.groupId ? "/home" : "/groups"} replace />
    // Token exists but profile failed to load (e.g. expired) — fall through and show page
  }
  return children
}
const ProtectedRoute = ({ token, user, isProfileLoading, children }) => {
  if (!token) return <Navigate to="/" replace />
  if (isProfileLoading || !user) return <Spinner variant="warning" className="standard-spinner" />
  return children
}

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const isProfileLoading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUserProfile())
    }
    // eslint-disable-next-line no-undef
    console.log("ChoreMate v" + __APP_VERSION__)
  }, [token, user, dispatch, isProfileLoading])

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/register-with-invite"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <WeeklyView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <ManageGroupView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-task"
          element={
            <ProtectedRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <AddNewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute token={token} user={user} isProfileLoading={isProfileLoading}>
              <ProfileView />
            </ProtectedRoute>
          }
        />

        {/* Wildcard fallback */}
        <Route
          path="*"
          element={
            token ? (
              isProfileLoading || !user ? (
                <Spinner variant="warning" className="standard-spinner" />
              ) : (
                <Navigate to={user.groupId ? "/home" : "/groups"} replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
