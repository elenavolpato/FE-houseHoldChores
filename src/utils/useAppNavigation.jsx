import { useNavigate } from "react-router-dom"

export const useAppNavigation = () => {
  const navigate = useNavigate()

  const navigateTo = (path, options = {}) => {
    const safePath = path.startsWith("/") ? path : `/${path}`
    navigate(safePath, options)
  }

  return { navigateTo }
}
