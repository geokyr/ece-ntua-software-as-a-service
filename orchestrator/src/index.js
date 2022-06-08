const express = require('express')
const app = express()
const port = process.env.PORT
require("../config/index.js")

// Import routes
const helloworld = require("./routes/helloworld")
const orchestrator = require("./routes/orchestrator")
const authentication = require("./routes/authentication")


// Tests the connectivity of the server
app.get('/hello',helloworld)

// Updates the login session
app.post('/orchestrator',authentication,orchestrator)

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`orchestrator listening on port ${port}`)
})
