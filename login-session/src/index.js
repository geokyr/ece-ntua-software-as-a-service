const express = require('express')
const app = express()
const port = process.env.PORT
// require("../db/connection.js")
require("../config/index.js")

// Import routes
const helloworld = require("./routes/helloworld")
const loginSession = require("./routes/loginSession")
const authentication = require("./routes/authentication")


// Tests the connectivity of the server
app.get('/hello',helloworld)

// Updates the login session
app.post('/loginSession',authentication,loginSession)

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`login-session listening on port ${port}`)
})
