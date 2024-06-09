import { useGetSinglePokemonQuery } from "../features/pokemon/pokemonApiSlice"

/**
 * Custom hook that fetches the details of a current Pokemon.
 *
 * @param {number | null} id - The ID of the Pokemon to fetch.
 * @param {boolean} [forceSkip] - Optional flag to force skip the query.
 * @return {Object} An object containing the fetched Pokemon data, error state, loading state, and success state.
 */
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
