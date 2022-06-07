const express = require('express')
const app = express()
const port = process.env.PORT
require("../config/index.js")
const cors = require("cors");
app.use(cors());

app.options("*", cors());

// Import routes
const helloworld = require("./routes/helloworld")
const updateATLDatabase = require("./routes/updateATLDatabase")
const deleteATLRecords = require("./routes/deleteATLRecords")

// Tests the connectivity of the server
app.get('/hello',helloworld)

// Updates the database
app.post('/updateATLDatabase',updateATLDatabase)

// Deletes the database
app.delete('/deleteATLRecords',deleteATLRecords)


// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`actual-total-load-update-DB listening on port ${port}`)
})
