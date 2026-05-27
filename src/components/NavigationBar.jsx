import { useDispatch, useSelector } from "react-redux"
import { setActiveTab } from "../redux/choresSlice"

import { useAppNavigation } from "../utils/useAppNavigation"
import { useState } from "react"
import AddOptionsModal from "./AddOptionsModal"

function NavigationBar({ variant = "mobile" }) {
  const activeTab = useSelector((state) => state.chores.activeTab)
  const dispatch = useDispatch()
  const { navigateTo } = useAppNavigation()

  const [modalOpen, setModalOpen] = useState(false)
  const handleItemClick = (item) => {
    dispatch(setActiveTab(item.id))
    item.goTo !== null ? navigateTo(item.goTo) : setModalOpen(true)
  }

  const navItems = [
    /*   { id: "today", label: "Today", icon: "fa-regular fa-calendar-check", goTo: "home" }, */
    { id: "calendar", label: "Chores", icon: "fa-regular fa-calendar-days", goTo: "home" },
    { id: "add", label: "Add", icon: "fa-regular fa-square-plus", goTo: null },
    { id: "groceries", label: "Groceries", icon: "fa-solid fa-cart-shopping", goTo: "groceries" },
    { id: "group", label: "Group", icon: "fa-solid fa-users", goTo: "groups" },
  ]

  const urlPath = window.location.pathname

  if (variant === "desktop" && urlPath !== "/" && urlPath !== "/login" && urlPath !== "/register") {
    return (
      <div className="d-flex align-items-center gap-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`btn border-0 px-3 py-2 rounded-pill d-flex align-items-center gap-2 fw-medium transition-all ${
                isActive ? "bg-warning text-dark" : "text-secondary"
              }`}
              style={{
                fontSize: "14px",
                backgroundColor: isActive ? "#F1C40F" : "transparent",
              }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          )
        })}
        <AddOptionsModal show={modalOpen} handleClose={() => setModalOpen(false)} />
      </div>
    )
  }
  return (
    <div className="d-block d-lg-none position-fixed bottom-0 start-0 w-100" style={{ zIndex: 1050 }}>
      <div className="position-relative w-100 bg-white shadow-lg border-top" style={{ height: "76px" }}>
        {/* FLOATING ACTION PLUS BUTTON */}
        <button
          className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center shadow border-0 position-absolute plus-button"
          style={{
            width: "56px",
            height: "56px",
            top: "-70px",
            right: "24px",
            backgroundColor: "#F1C40F",
            zIndex: 1060,
          }}
          onClick={() => setModalOpen(true)}
        >
          <i className="fa-solid fa-plus fs-4 text-dark"></i>
        </button>

        {/* NAVIGATION LINKS CONTAINER */}
        <div className="d-flex justify-content-around align-items-center h-100 px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="btn border-0 d-flex flex-column align-items-center justify-content-center p-0 position-relative"
                style={{ width: "60px", background: "none" }}
              >
                {/* Visual Yellow Background Capsule */}
                {isActive && (
                  <div
                    className="position-absolute rounded-pill"
                    style={{
                      backgroundColor: "#F1C40F",
                      width: "54px",
                      height: "45px",
                      top: "-3px",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Icon & Text */}
                <i className={`${item.icon} mb-1 position-relative`} style={{ fontSize: "18px", zIndex: 1, color: "#2C3E50" }}></i>
                <span className="position-relative fw-medium" style={{ fontSize: "11px", zIndex: 1, color: "#2C3E50" }}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <AddOptionsModal show={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  )
}

export default NavigationBar
