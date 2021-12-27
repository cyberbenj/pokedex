import React, { useState, useEffect, useRef } from 'react'
import './App.css'

import Search from './components/Search'
import Tile from './components/Tile'
import Card from './components/Card'

import { getPokemons } from './pokeapi'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [search, setSearch] = useState('')
  const [scrollY, setScrollY] = useState(0)

  const appRef = useRef()

  useEffect(() => {
    getPokemons().then(pokemons => setPokemons(pokemons))
  }, [])

  useEffect(() => {
    if (pokemon === null) {
      document.body.style.overflowY = ''
      appRef.current.style.display = ''
      window.scrollTo(0, scrollY)
    } else {
      setScrollY(window.scrollY)
      document.body.style.overflowY = 'hidden'
      appRef.current.style.display = 'hidden'
    }
  }, [pokemon])

  const showPokemon = async (id) => setPokemon(pokemons[id-1])
  const hidePokemon = () => setPokemon(null)
  const searchPokemon = (value) => setSearch(value)

  return (
    <>
      {
        pokemon !== null &&
        <Card 
          id={pokemon.id} 
          img={pokemon.img} 
          sprite={pokemon.sprite} 
          name={pokemon.name} 
          types={pokemon.types} 
          height={pokemon.height} 
          weight={pokemon.weight} 
          text={pokemon.text} 
          hidePokemon={hidePokemon} 
        />
      }
      <div className='app' ref={appRef}>
        <div className='tools'>
          <Search search={search} searchPokemon={searchPokemon}/>
        </div>
        <div className='tiles'>
          {
            pokemons
            .filter((pokemon) => {
              return search === '' || pokemon.name.toLowerCase().includes(search.toLowerCase())
            })
            .map((pokemon, key) => {
              return <Tile 
                key={key} 
                id={pokemon.id} 
                img={pokemon.img} 
                name={pokemon.name} 
                showPokemon={showPokemon} 
              />
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
