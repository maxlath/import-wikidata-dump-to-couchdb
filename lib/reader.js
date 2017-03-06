const fs = require('fs')
const liner = require('./liner')

module.exports = function (file, fn) {
  if (typeof file !== 'string') {
    throw new Error('missing file name')
  }

  if (typeof fn !== 'function') {
    throw new Error('missing function')
  }

  fs.createReadStream(file).pipe(liner)

  return liner.on('readable', function () {
    var line = liner.read()
    while (line) {
      fn(line)
      line = liner.read()
    }
  })
}
