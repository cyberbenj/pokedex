import React, { useState, useRef, useContext } from 'react'
import './Search.css'

import { LangContext } from '../LangContext'

const Search = ({ searchPokemon }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  
  const handleChange = event => {
    const newValue = event.target.value
    setValue(newValue)
    searchPokemon(newValue)
  }

  const handleclick = event => {
    inputRef.current.focus()
  }

  const { lang } = useContext(LangContext)

  return (
    <div className='search' onClick={handleclick}>
      <input 
        type='text'
        value={value}
        placeholder={'Search pokemons'.translate(lang)}
        spellCheck='false' 
        autoComplete='off'
        onChange={handleChange}
        ref={inputRef}
      />
      <span className='fa fa-search'></span>
    </div>
  )
}

export default Search
