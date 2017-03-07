const LineByLineReader = require('line-by-line')

module.exports = function (fn, file, start, end) {
  if (typeof file !== 'string') throw new Error('missing file name')
  const lr = new LineByLineReader(file, { skipEmptyLines: true, start, end })
  lr.on('error', console.error)
  lr.on('line', handleLine(fn, lr))
  lr.on('end', console.log.bind(console, 'done!'))
}

const handleLine = (fn, lr) => (line) => {
  if (line.trim() === '[' || line.trim() === ']') return
  lr.pause()
  // Handle lines sequentially
  // Pro: should the time to CouchDB to diggest all those lines
  // Con: slower than parallelizing
  fn(line).then(() => lr.resume())
}
