module.exports = function(app) {
low = require("lowdb")
fileAsync = require("lowdb/lib/storages/file-async")
DATA_PATH = "data/"
DB_NAME = "mfin"
// Create server

// Start database using file-async storage
// For ease of use, read is synchronous
db = low(DATA_PATH+DB_NAME+".json", {
  storage: fileAsync
})

// Routes
// GET /tests/:id
app.get("/tests/:id", (req, res) => {
  const test = db.get("tests")
    .find({ id: req.params.id })
    .value()

  res.send(test)
})

// test /tests
app.post("/tests", (req, res) => {
  db.get("tests")
    .push(req.body)
    .last()
    .assign({ id: Date.now() })
    .write()
    .then(test => res.send(test))
})

// Init
db.defaults({ tests: [] }).write()
  
 };
