import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { currentPokemonSlice } from "../currentPokemon/currentPokemonSlice"
import { pokemonApiSlice } from "../pokemon/pokemonApiSlice"
import Pagination from "./Pagination"
import { paginationSlice, updateOffset, updatePage } from "./paginationSlice"

const createTestStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      pagination: paginationSlice.reducer,
      currentPokemon: currentPokemonSlice.reducer,
      [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(pokemonApiSlice.middleware),
    preloadedState,
  })

  setupListeners(store.dispatch)

  return store
}

describe.only("Pagination Component", () => {
  test("renders correctly", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )
    expect(screen.getByText("Children")).toBeInTheDocument()
    expect(screen.getByText("Prev")).toBeInTheDocument()
    expect(screen.getByText("Next")).toBeInTheDocument()
  })

  test("disables Prev button correctly", () => {
    const store = createTestStore({
      pagination: { ...paginationSlice.getInitialState(), disablePrev: true },
    })
    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )
    expect(screen.getByText("Prev")).toBeDisabled()
  })

  test("disables Next button correctly", () => {
    const store = createTestStore({
      pagination: { ...paginationSlice.getInitialState(), disableNext: true },
    })
    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )
    expect(screen.getByText("Next")).toBeDisabled()
  })

  test("dispatches updatePage on Prev button click", () => {
    const store = createTestStore({
      pagination: {
        ...paginationSlice.getInitialState(),
        currentPage: 1,
        disablePrev: false,
      },
    })
    const mockDispatch = vi.fn()
    store.dispatch = mockDispatch

    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )

    fireEvent.click(screen.getByText("Prev"))
    expect(store.dispatch).toHaveBeenCalledWith(updatePage(expect.any(Number)))
  })

  test("dispatches updatePage on Next button click", () => {
    const store = createTestStore()
    const mockDispatch = vi.fn()
    store.dispatch = mockDispatch

    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )

    fireEvent.click(screen.getByText("Next"))
    expect(store.dispatch).toHaveBeenCalledWith(updatePage(expect.any(Number)))
  })

  test("dispatches updateOffset on currentPage change", () => {
    const store = createTestStore()
    const mockDispatch = vi.fn()
    store.dispatch = mockDispatch

    render(
      <Provider store={store}>
        <Pagination>
          <div>Children</div>
        </Pagination>
      </Provider>,
    )

    expect(store.dispatch).toHaveBeenCalledWith(
      updateOffset(expect.any(Number)),
    )
  })
})
