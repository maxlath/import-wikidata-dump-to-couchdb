fs = require 'fs'
liner = require './liner'

module.exports = (file, fn)->
  unless typeof file is 'string'
    throw new Error 'missing file name'

  unless typeof fn is 'function'
    throw new Error 'missing function'

  fs.createReadStream(file).pipe liner

  liner.on 'readable', ->
    line = undefined
    while line = liner.read()
      fn line
    return
