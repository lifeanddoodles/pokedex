import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PokemonDetailsData extends Record<string, any> {
  id: number
}

export interface CurrentPokemonState {
  id: number | null
  imgSrc: string
  pokemon: PokemonDetailsData | null
}

const initialState: CurrentPokemonState = {
  id: null,
  imgSrc: "https://reactjs.org/logo-og.png",
  pokemon: null,
}

export const currentPokemonSlice = createSlice({
  name: "currentPokemon",
  initialState,
  reducers: create => ({
    updateCurrentPokemonId: create.reducer(
      (state, action: PayloadAction<CurrentPokemonState["id"]>) => {
        state.id = action.payload
      },
    ),
    updateCurrentPokemonImg: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.imgSrc = action.payload
      },
    ),
    updateCurrentPokemon: create.reducer(
      (state, action: PayloadAction<PokemonDetailsData | null>) => {
        state.pokemon = action.payload
      },
    ),
  }),
  selectors: {
    selectCurrentPokemonImg: currentPokemonState => currentPokemonState.imgSrc,
    selectCurrentPokemon: currentPokemonState => currentPokemonState.pokemon,
  },
})

export const {
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  updateCurrentPokemon,
} = currentPokemonSlice.actions

export const { selectCurrentPokemonImg, selectCurrentPokemon } =
  currentPokemonSlice.selectors
