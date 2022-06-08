const express = require('express')
const app = express()
app.use(express.json());
const port = process.env.PORT
require("../config/index.js")

// Import routes
const helloworld = require("./routes/helloworld")
const handlePlan = require("./routes/handlePlan")
const authentication = require("./routes/authentication")


// Tests the connectivity of the server
app.get('/hello',helloworld)

// Updates the plan
app.post('/handlePlan',authentication,handlePlan)

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`handlePlan listening on port ${port}`)
})
