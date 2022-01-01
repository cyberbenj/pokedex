import React from 'react'
import './CloseButton.css'

const CloseButton = ({ hidePokemon }) => {
  const handleClick = event => hidePokemon()

  return (
    <div className='hitbox' onClick={handleClick}>
      <div className='close-button'>
        <span className='fa fa-times' />
      </div>
    </div>
  )
}

export default CloseButton
