import React from 'react'
import './Language.css'

const Language = ({ checked, language, setLanguage }) => {
  const { name, flagCode } = language
  const handleClick = () => setLanguage(language)

  return (
    <label className='language'>
      <input type='radio' name='lang' defaultChecked={checked} onClick={handleClick} />
      <img
        className='language'
        src={`https://flagcdn.com/32x24/${flagCode}.png`}
        srcSet={`https://flagcdn.com/64x48/${flagCode}.png 2x, https://flagcdn.com/96x72/${flagCode}.png 3x`}
        width='32'
        height='24'
        alt={flagCode}
      />
      <span>{name}</span>
    </label>
  )
}

export default Language
