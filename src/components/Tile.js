import React from 'react'
import './Tile.css'

const Tile = ({ id, img, name, showPokemon }) => {
  const handleClick = event => showPokemon(id)
  
  return (
    <div className='tile'>
      <img 
        src={img} 
        alt={name}
        onClick={handleClick}
      />
    </div>
  )
}

export default Tile
