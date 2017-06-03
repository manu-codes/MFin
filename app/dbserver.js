const express = require('express')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const DATA_PATH = 'data/';
const DB_NAME = 'mfin';
// Create server
const app = express()

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low(DATA_PATH+DB_NAME+'.json', {
  storage: fileAsync
})

// Routes
// GET /tests/:id
app.get('/tests/:id', (req, res) => {
  const test = db.get('tests')
    .find({ id: req.params.id })
    .value()

  res.send(test)
})

// test /tests
app.test('/tests', (req, res) => {
  db.get('tests')
    .push(req.body)
    .last()
    .assign({ id: Date.now() })
    .write()
    .then(test => res.send(test))
})

// Init
db.defaults({ tests: [] })
  .write()
  .then(() => {
    app.listen(3000, () => console.log('Server is listening')
  })