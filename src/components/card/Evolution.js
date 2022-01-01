import React from 'react'
import './Evolution.css'

const Evolution = ({ id, sprite, name, showPokemon }) => {
  const handleClick = (id) => showPokemon(id)

  return (
    <>
      <div className='evolution' onClick={() => handleClick(id)}>
        <img src={sprite} alt={name} />
      </div>
      <span className='arrow fa fa-arrow-right' />
    </>
  )
}

export default Evolution
