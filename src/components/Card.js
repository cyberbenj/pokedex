import React from 'react'
import './Card.css'
import Tag from './Tag'

const Card = ({ id, img, sprite, name, types, text, hidePokemon }) => {  
  const handleClick = event => hidePokemon()
  
  return (
    <div className='card'>
      <div className='close-button' onClick={handleClick}>&#x2715;</div>
      <div className='card-image'>
        <img src={img} alt={name} />
      </div>
      <div className='card-infos'>
        <div className='card-name'>
          <p>
            {name} <span className='number'>#{id.toString().padStart(3, '0')}</span>
          </p>
        </div>
        <div className='card-types'>
          {
            types.map((type, key) => {
              return <Tag key={key} name={type}/>
            })
          }
        </div>
        <div className='card-text'>
          <p style={{whiteSpace: 'pre-wrap'}}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
