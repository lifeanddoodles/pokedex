import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import {
  toggleViewDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
} from "../../features/currentPokemon/currentPokemonSlice"
import { Pokemon } from "../../features/pokemon/Pokemon"
import pokemonLogo from "/pokemon-icon.png"

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCurrentPokemon(null))
    dispatch(updateCurrentPokemonId(null))
    dispatch(updateCurrentPokemonImg(pokemonLogo))
    dispatch(toggleViewDetails(false))
  }, [dispatch])

  return <Pokemon />
}

export default Home
