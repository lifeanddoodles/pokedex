import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  toggleViewDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
} from "../../features/currentPokemon/currentPokemonSlice"
import { selectCurrentOffset } from "../../features/pagination/paginationSlice"
import { Pokemon } from "../../features/pokemon/Pokemon"

const Home = () => {
  const currentOffset = useAppSelector(selectCurrentOffset)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCurrentPokemon(null))
    dispatch(updateCurrentPokemonId(null))
    dispatch(updateCurrentPokemonImg("https://reactjs.org/logo-og.png"))
    dispatch(toggleViewDetails(false))
  }, [dispatch])

  return <Pokemon currentOffset={currentOffset} />
}

export default Home
