import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { currentPokemonSlice } from "../features/currentPokemon/currentPokemonSlice"
import { paginationSlice } from "../features/pagination/paginationSlice"
import { pokemonApiSlice } from "../features/pokemon/pokemonApiSlice"

const rootReducer = combineSlices(
  pokemonApiSlice,
  currentPokemonSlice,
  paginationSlice,
)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(pokemonApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
