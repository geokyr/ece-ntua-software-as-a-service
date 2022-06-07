const express = require('express')
const app = express()
const port = process.env.PORT
require("../config/index.js")

// Import routes
const helloworld = require("./routes/helloworld")
const updatePFDatabase = require("./routes/updatePFDatabase")
const deletePFRecords = require("./routes/deletePFRecords")


// Tests the connectivity of the server
app.get('/hello',helloworld)

// updates the database
app.post('/updatePFDatabase',updatePFDatabase)

// deleted the database
app.delete('/deletePFRecords',deletePFRecords)


// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`physical-flows listening on port ${port}`)
})
