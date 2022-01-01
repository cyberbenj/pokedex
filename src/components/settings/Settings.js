import React from 'react'
import './Settings.css'

const Settings = ({ title, children, onClose }) => {
  return (
    <div className='settings-container'>
      <div className='settings'>
        <div className='header'>
          <div className='title'>{title}</div>
        </div>
        <div className='body'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Settings
