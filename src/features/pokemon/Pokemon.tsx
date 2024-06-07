import { Link } from "react-router-dom"
import styles from "./Pokemon.module.css"
import { useGetPokemonQuery } from "./pokemonApiSlice"

export const Pokemon = ({ currentOffset = 0 }: { currentOffset?: number }) => {
  const { data, isError, isLoading, isSuccess } =
    useGetPokemonQuery(currentOffset)

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
      <div className={styles.container}>
        <ul>
          {data.results.map(({ name, url }) => {
            const id = Number(url.split("/").slice(-2, -1)[0])

            return (
              <li key={name}>
                <Link to={`/pokemon/${id}`}>
                  <h2>{name}</h2>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return null
}
