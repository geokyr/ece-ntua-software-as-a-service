const express = require("express");
const app = express();
const port = process.env.PORT;
app.use(express.json());

// Import routes
const getFileIndexes = require("./routes/getFileIndexes");
const getATLFile = require("./routes/getATLFile");
const checkNewATLFile = require("./routes/checkNewATLFile");
const getAGPTFile = require("./routes/getAGPTFile");
const checkNewAGPTFile = require("./routes/checkNewAGPTFile");
const getFFFile = require("./routes/getFFFile");
const checkNewFFFile = require("./routes/checkNewFFFile");

let ATLIndex = 0;
let AGPTIndex = 0;
let FFIndex = 0;

const ATLIndexUp = async (req, res) => {
    if (ATLIndex < 9) {
        ATLIndex++;
    } else ATLIndex = 0;
    res.sendStatus(200);
};

const AGPTIndexUp = async (req, res) => {
    if (AGPTIndex < 9) {
        AGPTIndex++;
    } else AGPTIndex = 0;
    res.sendStatus(200);
};

const FFIndexUp = async (req, res) => {
    if (FFIndex < 9) {
        FFIndex++;
    } else FFIndex = 0;
    res.sendStatus(200);
};

const AllIndexesUp = async (req, res) => {
    if (FFIndex < 9) {
        FFIndex++;
    } else FFIndex = 0;

    if (AGPTIndex < 9) {
        AGPTIndex++;
    } else AGPTIndex = 0;

    if (ATLIndex < 9) {
        ATLIndex++;
    } else ATLIndex = 0;
    res.sendStatus(200);
};

// create middleware to get ATLIndex
app.use((req, res, next) => {
    req.ATLIndex = ATLIndex;
    req.FFIndex = FFIndex;
    req.AGPTIndex = AGPTIndex;
    next();
});

app.get("/getFileIndexes", getFileIndexes);

app.get("/incrementATLIndex", ATLIndexUp);
app.get("/incrementAGPTIndex", AGPTIndexUp);
app.get("/incrementFFIndex", FFIndexUp);
app.get("/incrementAllIndexes", AllIndexesUp);

app.get("/getATLFile", getATLFile);
app.post("/checkNewATLFile", checkNewATLFile);

app.get("/getAGPTFile", getAGPTFile);
app.post("/checkNewAGPTFile", checkNewAGPTFile);

app.get("/getFFFile", getFFFile);
app.post("/checkNewFFFile", checkNewFFFile);

app.listen(port, () => {
    console.log(`data-provider listening on port ${port}`);
});
