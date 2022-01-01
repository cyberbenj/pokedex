import React from 'react'
import './SettingsIcon.css'

const SettingsIcon = ({ showSettings }) => {
  const handleClick = event => showSettings()

  return (
    <div className='settings-icon' onClick={handleClick}>
      <span className='fa fa-ellipsis-h' />
    </div>
  )
}

export default SettingsIcon
