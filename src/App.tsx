import { Outlet } from "react-router-dom"
import "./App.css"
import { useAppSelector } from "./app/hooks"
import Pagination from "./components/Pagination"
import { selectCurrentPokemonImg } from "./features/currentPokemon/currentPokemonSlice"

const App = () => {
  const currentPokemonImg = useAppSelector(selectCurrentPokemonImg)

  return (
    <div className="app">
      <main>
        <Pagination>
          <section className="row">
            <figure className="col imgContainer">
              <img
                width="300"
                height="300"
                src={currentPokemonImg}
                alt="Current Pokemon"
              />
            </figure>
            <div className="col details">
              <Outlet />
            </div>
          </section>
        </Pagination>
      </main>
    </div>
  )
}

export default App
