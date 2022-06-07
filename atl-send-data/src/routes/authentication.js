const { getAuth } = require("firebase-admin/auth");

module.exports = async (req, res, next) => {
  try {
    // Retrieves token from request headers
    let idToken = req.header("Authorization").split(" ")[1];
    if (!idToken) throw new Error();
    // Identifies user by token
    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // if uid exists in the database, then proceed
        if (uid) {
          // go to next middleware
          next();
        } else throw new Error();
      })
      .catch((e) => {
        res.status(411).send({ error: "Please authenticate." });
      });
  } catch (e) {
    res.status(411).send({ error: "Please authenticate." });
  }
};
