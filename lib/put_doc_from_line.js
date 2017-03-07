const breq = require('bluereq')
const CONFIG = require('config')
const dbUrl = CONFIG.db.dbUrl()

module.exports = function (line) {
  // Remove the comma at the end of the line
  line = line.replace(/,$/, '')
  // Will throw if it isnt valid JSON
  const json = JSON.parse(line)
  const { id } = json
  return breq.put(`${dbUrl}/${id}`, json)
  .then(res => console.log(res.body))
  // .catch console.error.bind(console, 'err')
}
