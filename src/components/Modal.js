import React from 'react'
import './Modal.css'

const Modal = ({ title, children, onClose }) => {
  return (
    <div className='modal-container'>
      <div className='modal'>
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

export default Modal
