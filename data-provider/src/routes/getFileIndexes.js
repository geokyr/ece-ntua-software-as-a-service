// Body of each endpoint
module.exports = async (req, res) => {
    res.send({
        FFIndex: req.FFIndex,
        AGPTIndex: req.AGPTIndex,
        ATLIndex: req.ATLIndex,
    });
};
