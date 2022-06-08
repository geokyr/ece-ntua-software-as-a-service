let admin = require("firebase-admin");
const db = admin.firestore();
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    // Finds user's login session
    const logincollection = db.collection("Login-Sessions");
    const login = await logincollection
      .where("userId", "==", req.app.locals.uid)
      .get();
    let data = {
      userId: req.app.locals.uid,
      loginTime: moment().format("DD/MM/YYYY, HH:mm:ss").toString(),
    };
    
    // Create and Update the values of that document
    logincollection.doc(data.userId.toString()).set(data);

    res.status(200).send("Login completed!");
  } catch (e) {
    console.log("error is", e);
  }
};
