var path = require("path");
const files = require("../files/AGPT.json");

module.exports = async (req, res) => {
    let AGPTIndex = req.AGPTIndex;
    let pathFile = path.resolve(
        `${__dirname}/../../data/AGPT/${files[AGPTIndex]}`
    );
    res.set("title", files[AGPTIndex]).sendFile(pathFile);
};
