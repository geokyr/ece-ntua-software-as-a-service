const { getAuth } = require("firebase-admin/auth");
let admin = require("firebase-admin");

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
        if (uid) {
          // Pass the user Id to the next level
          res.app.locals.uid = uid;
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
