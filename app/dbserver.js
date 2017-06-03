const express = require('express')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

// Create server
const app = express()

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low('db.json', {
  storage: fileAsync
})

// Routes
// GET /posts/:id
app.get('/posts/:id', (req, res) => {
  const post = db.get('posts')
    .find({ id: req.params.id })
    .value()

  res.send(post)
})

// POST /posts
app.post('/posts', (req, res) => {
  db.get('posts')
    .push(req.body)
    .last()
    .assign({ id: Date.now() })
    .write()
    .then(post => res.send(post))
})

// Init
db.defaults({ posts: [] })
  .write()
  .then(() => {
    app.listen(3000, () => console.log('Server is listening')
  })