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
        // Working with user data
        let userObject = {
          firstName:decodedToken.name.split(" ")[0],
          lastName:decodedToken.name.split(" ")[1],
          email:decodedToken.email,
          uid: decodedToken.uid
        }
        if (userObject.uid) {
          // Pass the user Id to the next level
          res.app.locals.userObject = userObject;
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
