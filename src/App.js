import React, { useState, useEffect, useRef } from 'react'
import './App.css'

import { getPokemons } from './pokeapi'

import Search from './components/Search'
import Modal from './components/Modal'
import SettingsIcon from './components/settings/SettingsIcon'
import Tile from './components/tile/Tile'
import Card from './components/card/Card'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [settings, setSettings] = useState(false)
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
  }, [pokemon, scrollY])

  const showSettings = () => setSettings(!settings)
  const showPokemon = async (id) => setPokemon(pokemons[id-1])
  const hidePokemon = () => setPokemon(null)
  const searchPokemon = (value) => setSearch(value)

  if (settings) {
    return <Modal title={'Settings'.translate('fr')} />
  }

  return (
    <>
      {
        pokemon !== null &&
        <Card 
          pokemon={pokemon}
          showPokemon={showPokemon}
          hidePokemon={hidePokemon} 
        />
      }
      <div className='app' ref={appRef}>
        <div className='tools'>
          <Search search={search} searchPokemon={searchPokemon}/>
          <SettingsIcon showSettings={showSettings}/>
        </div>
        <div className='tiles'>
          {
            pokemons
            .filter((pokemon) => {
              return search === '' || pokemon.name.toLowerCase().includes(search.toLowerCase())
            })
            .map((pokemon, key) => {
              return (
                <Tile 
                  key={key} 
                  pokemon={pokemon}
                  showPokemon={showPokemon} 
                />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
