#!/usr/bin/env node
const reader = require('./lib/reader')
const putDocFromLine = require('./lib/put_doc_from_line')

const [ file, start, end ] = process.argv.slice(2)
reader(putDocFromLine, file, start, end)
