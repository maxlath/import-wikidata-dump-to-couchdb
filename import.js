const reader = require('./lib/reader')
const breq = require('bluereq')
const CONFIG = require('config')
const dbUrl = CONFIG.db.dbUrl()
const [ file ] = Array.from(process.argv.slice(2))

reader(file, function (line) {
  // remove the comma at the end of the line
  line = line.slice(0, -1)
  // will throw if it isnt valid JSON
  const json = JSON.parse(line)
  const { id } = json
  return breq.put(`${dbUrl}/${id}`, json)
  .then(res => console.log(res.body))
  // .catch console.error.bind(console, 'err')
})
