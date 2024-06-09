import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { mockPokemonListData, mockSinglePokemonData } from "../../__mocks__/"
import { currentPokemonSlice } from "../currentPokemon/currentPokemonSlice"
import { paginationSlice } from "../pagination/paginationSlice"
import { Pokemon } from "./Pokemon"
import { pokemonApiSlice } from "./pokemonApiSlice"

// Mock the useCurrentPokemonDetails hook
vi.mock("../../hooks/useCurrentPokemonDetails", () => ({
  __esModule: true,
  default: () => ({
    singlePokemonData: {
      sprites: { front_default: mockSinglePokemonData.sprites.front_default },
      id: mockSinglePokemonData.id,
    },
    isSinglePokemonSuccess: true,
  }),
}))

const createTestStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
      currentPokemon: currentPokemonSlice.reducer,
      pagination: paginationSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(pokemonApiSlice.middleware),
    preloadedState,
  })

  return store
}

test("renders loading state", () => {
  render(
    <Provider store={createTestStore()}>
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    </Provider>,
  )

  expect(screen.getByRole("status")).toHaveTextContent("Loading...")
})

test("renders Pokemon list and handles click events", async () => {
  const successStore = createTestStore({
    [pokemonApiSlice.reducerPath]: {
      queries: {
        "getPokemon({ offset: 0, limit: 20 })": {
          status: "fulfilled",
          data: mockPokemonListData,
        },
      },
    },
  })

  render(
    <Provider store={successStore}>
      <MemoryRouter>
        <Pokemon />
      </MemoryRouter>
    </Provider>,
  )

  const selectedPokemon = new RegExp(mockSinglePokemonData.name, "i")

  expect(await screen.findByText(selectedPokemon)).toBeInTheDocument()

  fireEvent.click(screen.getByText(selectedPokemon))
  expect(successStore.getState().currentPokemon.id).toBe(
    mockSinglePokemonData.id,
  )
  expect(successStore.getState().currentPokemon.imgSrc).toBe(
    mockSinglePokemonData.sprites.front_default,
  )
})
