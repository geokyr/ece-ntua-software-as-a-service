var path = require("path");
const files = require("../files/FF.json");

module.exports = async (req, res) => {
    let FFIndex = req.FFIndex;
    let pathFile = path.resolve(
        `${__dirname}/../../data/FF/${files[FFIndex]}`
    );
    res.set("title", files[FFIndex]).sendFile(pathFile);
};
