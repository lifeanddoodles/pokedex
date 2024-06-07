import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CurrentPokemonState {
  id: number | null
  imgSrc: string
}

const initialState: CurrentPokemonState = {
  id: null,
  imgSrc: "https://reactjs.org/logo-og.png",
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
  }),
  selectors: {
    selectCurrentPokemonImg: currentPokemonState => currentPokemonState.imgSrc,
  },
})

export const { updateCurrentPokemonId, updateCurrentPokemonImg } =
  currentPokemonSlice.actions

export const { selectCurrentPokemonImg } = currentPokemonSlice.selectors
