import React, { useContext } from 'react'
import './Card.css'

import { LangContext } from '../../LangContext'

import CloseButton from './CloseButton'
import Tag from './Tag'
import Evolution from './Evolution'

const Card = ({ pokemon, showPokemon, hidePokemon }) => {
  const { id, name, img, types, weight, height, text, evolutions } = pokemon
  const { lang } = useContext(LangContext)

  return (
    <div className='card'>
      <CloseButton hidePokemon={hidePokemon}/>
      <div className='card-image'>
        <img src={img} alt={name} />
      </div>
      <div className='card-infos'>
        <div className='card-name'>
          <p>
            {name} <span className='number'>#{id.toString().padStart(3, '0')}</span>
          </p>
          <div className='card-types'>
            {
              types.map((type, key) => {
                return (
                  <Tag 
                    key={key} 
                    id={type.id} 
                    name={type.name} 
                  />
                )
              })
            }
          </div>
        </div>
        <div className='card-specs'>
          <div className='spec'>
            <span>{'Weight'.translate(lang)}</span>
            {(weight / 10).toFixed(1)} kg
          </div>
          <div className='spec'>
            <span>{'Height'.translate(lang)}</span>
            {(height / 10).toFixed(1)} m
          </div>
        </div>
        <div className='card-text'>
          <p>{text}</p>
        </div>
        <div className='card-evolutions'>
          {
            evolutions.map((evolution, key) => {
              return (
                <Evolution 
                  key={key} 
                  id={evolution.id} 
                  name={evolution.name} 
                  sprite={evolution.sprite} 
                  showPokemon={showPokemon} 
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Card

//<p style={{whiteSpace: 'pre-wrap'}}>{text}</p>