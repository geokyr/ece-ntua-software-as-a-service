let admin = require("firebase-admin");
const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    // Finds the collection with login data
    const logincollection = db.collection("Login-Sessions");
    // Retrieves data for specific user
    const login = await logincollection
      .where("userId", "==", req.app.locals.userObject.uid)
      .get();
    let loginTime;
    // Checks if login document for specific user exists
    if (!login.empty) {
      login.forEach((doc) => {
        loginTime = doc.data().loginTime;
      });
    } else loginTime = "";

    // Finds the collection with plan data
    const plancollection = db.collection("Plan");
    // Retrieves data for specific user
    const plan = await plancollection
      .where("userId", "==", req.app.locals.userObject.uid)
      .get();
    let expirationDate;
    // Checks if plan document for specific user exists
    if (!plan.empty) {
      plan.forEach((doc) => {
        expirationDate = doc.data().expirationDate;
      });
    } else expirationDate = "";

    // Create final object including all data
    let finalObject = {};
    finalObject.loginTime = loginTime;
    finalObject.expirationDate = expirationDate;
    finalObject.firstName = req.app.locals.userObject.firstName;
    finalObject.lastName = req.app.locals.userObject.lastName;
    finalObject.email = req.app.locals.userObject.email;

    // Sends the response
    res.status(200).send(finalObject);
  } catch (e) {
    // Sends error message
    res.status(404).send(e);
  }
};
