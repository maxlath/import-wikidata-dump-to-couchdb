const breq = require('bluereq')
const { db, onConflict } = require('config')
const dbUrl = db.url()

const haveDiff = (a, b) => JSON.stringify(a) !== JSON.stringify(b)
// Format the response to continue in the putDocFromLine promise chain
const resLikeObject = (body) => { return { body } }

const handlers = {
  pass: (id) => resLikeObject({ id, conflict: true, passed: true }),

  update: (id, json) => {
    const url = `${dbUrl}/${id}`
    return breq.get(url)
    .then(res => {
      const { body } = res
      const rev = body._rev
      delete json._rev
      delete body._id
      delete body._rev
      if (haveDiff(json, body)) {
        json._rev = rev
        return breq.put(url, json)
        .then(res => resLikeObject({ id, conflict: true, updated: true }))
      } else {
        return resLikeObject({ id, conflict: true, no_change: true })
      }
    })
  },

  exit: (id, json, err) => { throw err }
}

const onConflictModes = Object.keys(handlers)

if (!onConflictModes.includes(onConflict)) {
  throw new Error(`invalid onConflict mode: ${onConflict}. Possibilities: ${onConflictModes}.`)
}

module.exports = handlers[onConflict]
