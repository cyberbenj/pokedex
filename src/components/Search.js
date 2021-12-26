import React, { useState } from 'react'
import './Search.css'

const Search = ({ search, searchPokemon }) => {
  const [value, setValue] = useState(search)
  
  const handleChange = event => {
    const newValue = event.target.value
    setValue(newValue)
    searchPokemon(newValue)
  }

  return (
    <div className='search'>
      <input 
        type='text'
        value={value}
        placeholder='Rechercher un pokemon' 
        spellCheck='false' 
        autoComplete='off'
        onChange={handleChange}
      />
      <span className='fa fa-search'></span>
    </div>
  )
}

export default Search
