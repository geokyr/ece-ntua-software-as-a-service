const files = require("../files/FF.json");

module.exports = async (req, res) => {
    let FFIndex = req.FFIndex;
    let externalFileName = req.body.fileName;
    res.status(200).send(externalFileName !== files[FFIndex]);
};
