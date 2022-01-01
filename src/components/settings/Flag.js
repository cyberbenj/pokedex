import React from 'react'
import './Flag.css'

const Flag = ({ code, name }) => (
  <img className='flag'
    src={`https://flagcdn.com/h40/${code}.png`}
    srcset={`https://flagcdn.com/h80/${code}.png 2x, https://flagcdn.com/h120/${code}.png 3x`}
    height='40'
    alt={name}
  />
)

export default Flag
