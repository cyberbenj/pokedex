import React from 'react'
import './Card.css'

const Card = ({ id, img, sprite, name, types, text, hidePokemon }) => {  
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
            return <div className='tag' key={key}><small>{type.toUpperCase()}</small></div>
          })
        }
      </div>
      <div className='card-text'>
        <div className='card-text-box'>
          <p style={{whiteSpace: 'pre-wrap'}}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
