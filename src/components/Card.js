import React from 'react'
import './Card.css'

const Card = ({ id, img, name, types, hidePokemon }) => {  
  const handleClick = event => hidePokemon()
  
  return (
    <div className='card'>
      <div className='close-button' onClick={handleClick}>&#x2715;</div>
      <div className='card-image'>
        <img src={img} alt={name} />
      </div>
      <div className='card-name'>
        {name} <span className='number'>#{id.toString().padStart(3, '0')}</span>
      </div>
      <div className='card-types'>
        {
          types.map((type, key) => {
            return <div className='tag' key={key}><small>{type}</small></div>
          })
        }
      </div>
    </div>
  )
}

export default Card
