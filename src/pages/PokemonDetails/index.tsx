// import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import {
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
} from "../../features/currentPokemon/currentPokemonSlice"
import { useGetSinglePokemonQuery } from "../../features/pokemon/pokemonApiSlice"

const PokemonDetails = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data, isError, isLoading, isSuccess } = useGetSinglePokemonQuery(id)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateCurrentPokemonImg(`${data?.sprites.front_default}`))
    dispatch(updateCurrentPokemonId(data?.id as number))
  }, [data, dispatch])

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div>
        <h1>{data.name}</h1>
      </div>
    )
  }

  return null
}

export default PokemonDetails
