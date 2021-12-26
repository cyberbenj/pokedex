import React from 'react'
import './Card.css'
import Tag from './Tag'

const Card = ({ id, img, sprite, name, types, height, weight, text, hidePokemon }) => {  
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
            {name} <span className='number'>No.{id.toString().padStart(3, '0')}</span>
          </p>
          <div className='card-types'>
            {
              types.map((type, key) => {
                return <Tag key={key} id={type.id} name={type.name}/>
              })
            }
          </div>
        </div>
        <div className='card-specs'>
          <div className='spec'>
            <span>Poids</span>
            {(weight / 10).toFixed(1)} kg
          </div>
          <div className='spec'>
            <span>Taille</span>
            {(height / 10).toFixed(1)} m
          </div>
        </div>
        <div className='card-text'>
          <p style={{whiteSpace: 'pre-wrap'}}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
