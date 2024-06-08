import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Pokemon {
  name: string
  url: string
}

interface PokemonDetailsResponse extends Record<string, any> {
  id: number
}

interface PokemonApiResponse {
  results: Pokemon[]
  count: number
  next: string | null
  prev: string | null
}

export const pokemonApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon" }),
  reducerPath: "pokemonApi",
  tagTypes: ["Pokemon"],
  endpoints: build => ({
    getPokemon: build.query<PokemonApiResponse, number>({
      query: (offset = 20) => `?offset=${offset}&limit=20`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id }],
    }),
    getSinglePokemon: build.query<PokemonDetailsResponse, number>({
      query: id => `${id}`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id }],
    }),
  }),
})

export const { useGetPokemonQuery, useGetSinglePokemonQuery } = pokemonApiSlice
