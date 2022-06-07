const files = require("../files/AGPT.json");

module.exports = async (req, res) => {
    let AGPTIndex = req.AGPTIndex;
    let externalFileName = req.body.fileName;
    res.status(200).send(externalFileName !== files[AGPTIndex]);
};
