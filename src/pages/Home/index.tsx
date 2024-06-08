import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import {
  toggleViewDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
} from "../../features/currentPokemon/currentPokemonSlice"
import { Pokemon } from "../../features/pokemon/Pokemon"

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCurrentPokemon(null))
    dispatch(updateCurrentPokemonId(null))
    dispatch(updateCurrentPokemonImg("https://reactjs.org/logo-og.png"))
    dispatch(toggleViewDetails(false))
  }, [dispatch])

  return <Pokemon />
}

export default Home
