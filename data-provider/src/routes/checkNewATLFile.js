const files = require("../files/ATL.json");

module.exports = async (req, res) => {
    let ATLIndex = req.ATLIndex;
    let externalFileName = req.body.fileName;
    res.status(200).send(externalFileName !== files[ATLIndex]);
};
