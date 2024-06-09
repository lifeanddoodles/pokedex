import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PokemonDetailsData extends Record<string, any> {
  id: number
}

export interface CurrentPokemonState {
  id: number | null
  imgSrc: string
  pokemon: PokemonDetailsData | null
  viewDetails: boolean
}

const initialState: CurrentPokemonState = {
  id: null,
  imgSrc: "/pokemon-icon.png",
  pokemon: null,
  viewDetails: false,
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
    toggleViewDetails: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.viewDetails = action.payload
      },
    ),
  }),
  selectors: {
    selectCurrentPokemonId: currentPokemonState => currentPokemonState.id,
    selectCurrentPokemonImg: currentPokemonState => currentPokemonState.imgSrc,
    selectCurrentPokemon: currentPokemonState => currentPokemonState.pokemon,
    selectViewCurrentPokemonDetails: currentPokemonState =>
      currentPokemonState.viewDetails,
  },
})

export const {
  toggleViewDetails,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  updateCurrentPokemon,
} = currentPokemonSlice.actions

export const {
  selectCurrentPokemonId,
  selectCurrentPokemonImg,
  selectCurrentPokemon,
  selectViewCurrentPokemonDetails,
} = currentPokemonSlice.selectors
