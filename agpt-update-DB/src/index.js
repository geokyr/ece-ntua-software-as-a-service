const express = require('express')
const app = express()
const port = process.env.PORT
require("../config/index.js")

// Import routes
const helloworld = require("./routes/helloworld")
const updateAGPTDatabase = require("./routes/updateAGPTDatabase")
const deleteAGPTRecords = require("./routes/deleteAGPTRecords")
const basicAuthentication = require("./routes/basicAuthentication")


// Tests the connectivity of the server
app.get('/hello',helloworld)

// Updates the database
app.post('/updateAGPTDatabase',basicAuthentication,updateAGPTDatabase)

// Deletes the database
app.delete('/deleteAGPTRecords',deleteAGPTRecords)


// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`aggregated-generation-per-type listening on port ${port}`)
})
