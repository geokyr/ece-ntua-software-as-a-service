const express = require("express");
const app = express();
const port = process.env.PORT;
require("../config/index.js");

// Import routes
const helloworld = require("./routes/helloworld");
const updateFFDatabase = require("./routes/updateFFDatabase");
const deleteFFRecords = require("./routes/deleteFFRecords");
const basicAuthentication = require("./routes/basicAuthentication");

// Tests the connectivity of the server
app.get("/hello", helloworld);

// updates the database
app.post("/updateFFDatabase", basicAuthentication, updateFFDatabase);

// deleted the database
app.delete("/deleteFFRecords", deleteFFRecords);

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`physical-flows listening on port ${port}`);
});
