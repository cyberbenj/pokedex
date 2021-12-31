import React from 'react'
import './Tile.css'

const Tile = ({ pokemon, showPokemon }) => {
  const handleClick = event => showPokemon(pokemon.id)
  
  return (
    <div className='tile'>
      <img 
        src={pokemon.img} 
        alt={pokemon.name}
        onClick={handleClick}
      />
      <span className='name'>{pokemon.name}</span>
    </div>
  )
}

export default Tile
