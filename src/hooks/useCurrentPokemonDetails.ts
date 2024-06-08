import { useGetSinglePokemonQuery } from "../features/pokemon/pokemonApiSlice"

const useCurrentPokemonDetails = (id: number | null, forceSkip?: boolean) => {
  const {
    data: singlePokemonData,
    isError: isErrorPokemon,
    isLoading: isSinglePokemonLoading,
    isSuccess: isSinglePokemonSuccess,
  } = useGetSinglePokemonQuery(id!, { skip: forceSkip ?? id === null })

  return {
    singlePokemonData,
    isErrorPokemon,
    isSinglePokemonLoading,
    isSinglePokemonSuccess,
  }
}

export default useCurrentPokemonDetails
