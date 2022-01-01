import React from 'react'
import './Tag.css'

const Tag = ({ id, name }) => (
  <div className={`tag color-${id}`}>
    <small>{name.toUpperCase()}</small>
  </div>
)

export default Tag
