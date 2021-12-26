import React, { useState, useEffect } from 'react'
import './App.css'

import Tile from './components/Tile'
import Card from './components/Card'

import { fetchPokemons, normalizePokemons } from './pokeapi'

function App() {
  let [pokemons, setPokemons] = useState([])
  let [pokemon, setPokemon] = useState(null)
  let [scrollY, setScrollY] = useState(0)

  useEffect(async () => {
    if (pokemon === null) {
      window.scrollTo(0, scrollY)
    } else {
      window.scrollTo(0, 0)
    }
  })

  useEffect(() => {
    fetchPokemons(151)
    .then(pokemons => {
      setPokemons(normalizePokemons(pokemons))
    })
  }, [])

  const showPokemon = async (id) => {
    setScrollY(window.scrollY)
    setPokemon(pokemons[id-1])
  }

  const hidePokemon = () => setPokemon(null)

  if (pokemon !== null) {
    return <Card id={pokemon.id} img={pokemon.img} sprite={pokemon.sprite} name={pokemon.name} types={pokemon.types} text={pokemon.text} hidePokemon={hidePokemon} />
  }
  
  return (
    <div className='tiles'>
      {
        pokemons.map((pokemon, key) => {
          return <Tile key={key} id={pokemon.id} img={pokemon.img} name={pokemon.name} showPokemon={showPokemon} />
        })
      }
    </div>
  )
}

export default App
