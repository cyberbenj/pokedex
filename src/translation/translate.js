const TRANSLATION = require('./translation.json')

String.prototype.translate = function(language, binds) {
  let text = TRANSLATION[this] ? TRANSLATION[this][language] || this : this
  for (let bind in binds) {
    let regex = new RegExp('{' + bind + '}', 'g')
    text = text.replace(regex, binds[bind])
  }
  return text
}
