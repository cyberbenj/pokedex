'use strict'

const TRANSLATION = require('./translation.json')

const LANGUAGE = {
  'jp': {
    data_language_id: 1,
    name: '日本語'
  },
  'kr': {
    data_language_id: 3,
    name: '한국어'
  },
  'fr': {
    data_language_id: 5,
    name: 'Français'
  },
  'de': {
    data_language_id: 6,
    name: 'Deutsch'
  },
  'es': {
    data_language_id: 7,
    name: 'Español'
  },
  'en': {
    data_language_id: 9,
    name: 'English'
  }
}

String.prototype.translate = function(language, binds) {
  let text = TRANSLATION[this] ? TRANSLATION[this][language] || this : this
  for (let bind in binds) {
    let regex = new RegExp('{' + bind + '}', 'g')
    text = text.replace(regex, binds[bind])
  }
  return text
}
