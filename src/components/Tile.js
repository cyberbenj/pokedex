import React from 'react'
import './Tile.css'

const Tile = ({ pokemon, showPokemon }) => {
  const { id, name, img } = pokemon
  const handleClick = event => showPokemon(id)

  return (
    <div className='tile'>
      <img
        src={img}
        alt={name}
        onClick={handleClick}
      />
      <span className='name'>{name}</span>
    </div>
  )
}

export default Tile
