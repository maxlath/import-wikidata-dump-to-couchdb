const breq = require('bluereq')
const { db } = require('config')
const dbUrl = db.url()
const handleConflict = require('./handle_conflict')

// Will make the process crash if the database doesn't exist
breq.get(dbUrl)
.catch(err => {
  if (err.statusCode === 404) {
    console.error('database not found:', db.urlWithoutCrendentials())
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
  .catch(err => {
    if (err.statusCode === 409) {
      return handleConflict(id, json, err)
    } else {
      throw err
    }
  })
  .then(res => console.log(res.body))
  .catch(console.error.bind(console, 'err'))
}
