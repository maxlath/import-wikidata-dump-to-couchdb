reader = require './reader'
[ file ] = process.argv.slice(2)
breq = require 'bluereq'
CONFIG = require 'config'
dbUrl = CONFIG.db.dbUrl()

reader file, (line)->
  # remove the comma at the end of the line
  line = line.slice(0, -1)
  # will throw if it isnt valid JSON
  json = JSON.parse line
  { id } = json
  breq.put "#{dbUrl}/#{id}", json
  .then (res)-> console.log res.body
  # .catch console.error.bind(console, 'err')
