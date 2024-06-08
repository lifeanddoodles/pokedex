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
  previous: string | null
}

export const pokemonApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/pokemon" }),
  reducerPath: "pokemonApi",
  tagTypes: ["Pokemon"],
  endpoints: build => ({
    getPokemon: build.query<
      PokemonApiResponse,
      { offset: number; limit: number }
    >({
      query: ({ offset = 0, limit = 20 }) => `?offset=${offset}&limit=${limit}`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id: "LIST" }],
    }),
    getSinglePokemon: build.query<PokemonDetailsResponse, number>({
      query: id => `${id}`,
      providesTags: (result, error, id) => [{ type: "Pokemon", id }],
    }),
  }),
})

export const { useGetPokemonQuery, useGetSinglePokemonQuery } = pokemonApiSlice
