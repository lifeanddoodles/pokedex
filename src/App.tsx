import { Outlet } from "react-router-dom"
import "./App.css"
import { useAppSelector } from "./app/hooks"
import Pagination from "./components/Pagination"
import { selectCurrentPokemonImg } from "./features/currentPokemon/currentPokemonSlice"

const App = () => {
  const currentPokemonImg = useAppSelector(selectCurrentPokemonImg)

  return (
    <div className="App">
      <main>
        <Pagination>
          <section className="row">
            <div className="col imgContainer">
              <img src={currentPokemonImg} alt="Current Pokemon" />
            </div>
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
