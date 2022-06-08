let admin = require("firebase-admin");
const db = admin.firestore();
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    if (req.body.extendDays) {
      // Define the response's value
      let finalDate;
      // Finds user's plan
      const plancollection = db.collection("Plan");
      let expirationDateVar;
      const plan = await plancollection
        .where("userId", "==", req.app.locals.uid)
        .get();

      // Gets the expirationDate from plan document in expirationDateVar variable
      if (!plan.empty) {
        plan.forEach((doc) => {
          expirationDateVar = doc.data().expirationDate;
        });
      }

      // Checks whether the plan is empty or the expiration date has already passed
      if (
        plan.empty ||
        moment(moment(), "DD-MM-YYYY").isAfter(
          moment(expirationDateVar, "DD/MM/YYYY")
        )
      ) {
        // New document object
        let newHandlePlan = {
          userId: req.app.locals.uid,
          expirationDate: moment()
            .add(req.body.extendDays, "days")
            .format("DD/MM/YYYY")
            .toString(),
        };
        finalDate = newHandlePlan.expirationDate;
        // Creates and Updates the values of that document
        plancollection.doc(newHandlePlan.userId.toString()).set(newHandlePlan);
      } else {
        // Adds more days while the current plan is still valid
        let newHandlePlan2 = {
          userId: req.app.locals.uid,
          expirationDate: moment(expirationDateVar, "DD/MM/YYYY")
            .add(req.body.extendDays, "days")
            .format("DD/MM/YYYY")
            .toString(),
        };
        finalDate = newHandlePlan2.expirationDate;
        // Update the values of that document
        plancollection
          .doc(newHandlePlan2.userId.toString())
          .set(newHandlePlan2);
      }
      res.status(200).send({ finalDate: finalDate });
    } else throw new Error();
  } catch (e) {
    res.status(404).send("Handle plan failed!");
  }
};
