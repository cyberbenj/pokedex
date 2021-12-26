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
    localStorage.removeItem('pokemons')
    const cachedPokemons = localStorage.getItem('pokemons')

    if (cachedPokemons !== null) {
      setPokemons(JSON.parse(cachedPokemons))
    } else {
      fetchPokemons()
      .then(collection => {
        const pokemons = normalizePokemons(collection)
        setPokemons(pokemons)
        localStorage.setItem('pokemons', JSON.stringify(pokemons))
      })
    }
  }, [])

  const showPokemon = async (id) => {
    setScrollY(window.scrollY)
    setPokemon(pokemons[id-1])
  }

  const hidePokemon = () => setPokemon(null)

  if (pokemon !== null) {
    return <Card 
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
