import React, { useState, createContext } from 'react'

const LangContext = createContext({})

const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'fr')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export { LangContext, LangContextProvider }
