import React from 'react'
import './Card.css'
import Tag from './Tag'
import Evolution from './Evolution'

const Card = ({ pokemon, showPokemon, hidePokemon }) => {
  const handleClick = event => hidePokemon()
  
  return (
    <div className='card'>
      <div className='close-button' onClick={handleClick}>&#x2715;</div>
      <div className='card-image'>
        <img src={pokemon.img} alt={pokemon.name} />
      </div>
      <div className='card-infos'>
        <div className='card-name'>
          <p>
            {pokemon.name} <span className='number'>#{pokemon.id.toString().padStart(3, '0')}</span>
          </p>
          <div className='card-types'>
            {
              pokemon.types.map((type, key) => {
                return <Tag key={key} id={type.id} name={type.name}/>
              })
            }
          </div>
        </div>
        <div className='card-specs'>
          <div className='spec'>
            <span>{'Weight'.translate('fr')}</span>
            {(pokemon.weight / 10).toFixed(1)} kg
          </div>
          <div className='spec'>
            <span>{'Height'.translate('fr')}</span>
            {(pokemon.height / 10).toFixed(1)} m
          </div>
        </div>
        <div className='card-text'>
          <p style={{whiteSpace: 'pre-wrap'}}>{pokemon.text}</p>
        </div>
        <div className='card-evolutions'>
          {
            pokemon.evolutions.map((evolution, key) => {
              return <Evolution key={key} id={evolution.id} name={evolution.name} sprite={evolution.sprite} showPokemon={showPokemon} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Card
