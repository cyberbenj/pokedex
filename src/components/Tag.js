import React from 'react'
import './Tag.css'

const Tag = ({ name }) => (
  <div className='tag'><small>{name.toUpperCase()}</small></div>
)

export default Tag
