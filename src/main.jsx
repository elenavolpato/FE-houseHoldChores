import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@/store"
import "@/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import App from "@/App.jsx"
import "bootstrap-icons/font/bootstrap-icons.css"

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
