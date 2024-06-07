import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import Home from "./pages/Home"
import PokemonDetails from "./pages/PokemonDetails"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
)

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
