const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT;
require("../config/index.js");
const cors = require("cors");
app.use(cors());

app.options("*", cors());

// Import routes
const retrieveFFData = require("./routes/retrieveFFData");
const authentication = require("./routes/authentication");

// Retrieves docs from the database
app.post("/getFFData", authentication, retrieveFFData);

// Server listens to a specific port for incoming requests
app.listen(port, () => {
  console.log(`actual-total-load-send-data listening on port ${port}`);
});
