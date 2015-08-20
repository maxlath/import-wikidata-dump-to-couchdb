# largely copyied from https://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/

stream = require 'stream'
liner = new stream.Transform { objectMode: true }

liner._transform = (chunk, encoding, done) ->
  data = chunk.toString()
  if @_lastLineData
    data = @_lastLineData + data
  lines = data.split('\n')
  @_lastLineData = lines.splice(lines.length - 1, 1)[0]
  lines.forEach @push.bind(this)
  done()
  return

liner._flush = (done) ->
  if @_lastLineData
    @push @_lastLineData
  @_lastLineData = null
  done()
  return

module.exports = liner
