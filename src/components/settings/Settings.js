import React, { useContext } from 'react'
import './Settings.css'

import { LangContext } from '../../LangContext'
import Language from './Language'

const LANGUAGES = require('./languages.json')

const Settings = ({ showSettings, changeDataLanguage }) => {
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
              LANGUAGES.map((language, key) => {
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
