const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT;
require("../config/index.js");
const cors = require("cors");
app.use(cors());

app.options("*", cors());

// Import routes
const helloworld = require("./routes/helloworld");
const retrievePFData = require("./routes/retrievePFData");
const authentication = require("./routes/authentication");

// Tests the connectivity of the server
app.get("/hello", helloworld);

// Retrieves docs from the database
app.get("/getPFData", authentication, retrievePFData);

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`actual-total-load-send-data listening on port ${port}`);
});
