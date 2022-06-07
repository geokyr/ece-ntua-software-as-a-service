var path = require("path");
const files = require("../files/ATL.json");

module.exports = async (req, res) => {
    let ATLIndex = req.ATLIndex;
    let pathFile = path.resolve(
        `${__dirname}/../../data/ATL/${files[ATLIndex]}`
    );
    res.set("title", files[ATLIndex]).sendFile(pathFile);
};
