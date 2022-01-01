import React, { useContext } from 'react'
import './Settings.css'

import { LangContext } from '../../LangContext'
import Language from './Language'

const Settings = ({ showSettings, changeDataLanguage }) => {

  const LANGUAGE = [
    {
      code: 'fr',
      data_language_id: 5,
      flag_code: 'fr',
      name: 'Français'
    },
    {
      code: 'en',
      data_language_id: 9,
      flag_code: 'gb',
      name: 'English'
    },
    {
      code: 'jp',
      data_language_id: 1,
      flag_code: 'jp',
      name: '日本語'
    },
    {
      code: 'kr',
      data_language_id: 3,
      flag_code: 'kr',
      name: '한국어'
    },
    {
      code: 'de',
      data_language_id: 6,
      flag_code: 'de',
      name: 'Deutsch'
    },
    {
      code: 'es',
      data_language_id: 7,
      flag_code: 'es',
      name: 'Español'
    }
  ]

  const { lang, setLang } = useContext(LangContext)

  const setLanguage = (language) => {
    const { code, data_language_id } = language 
    setLang(code)
    localStorage.setItem('app_lang', code)
    changeDataLanguage(data_language_id)
  }

  return (
    <div className='settings-container'>
      <div className='settings'>
        <div className='header'>
          <div className='title'>
            <span>{'Settings'.translate(lang)}</span>
          </div>
          <div className='button' onClick={showSettings}>
            <span className='fa fa-times'></span>
          </div>
        </div>
        <div className='body'>
          <div className='content'>
            <label htmlFor='language'>{'Language'.translate(lang)}</label>
            {
              LANGUAGE.map((language, key) => {
                const checked = language.code === lang
                return <Language key={key} checked={checked} language={language} setLanguage={setLanguage} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
