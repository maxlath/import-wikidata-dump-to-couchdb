const breq = require('bluereq')
const CONFIG = require('config')
const dbUrl = CONFIG.db.dbUrl()

// Will make the process crash if the database doesn't exist
breq.get(dbUrl)
.catch(err => {
  if (err.statusCode === 404) {
    console.error('database not found:', CONFIG.db.dbUrlWithoutCrendentials())
  } else {
    throw err
  }
})

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
