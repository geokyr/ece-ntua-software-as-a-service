let admin = require("firebase-admin");
const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    // Defines the collection of the firestore database
    let atlCollection = db.collection("AggregatedGenerationPerType");

    // Create a bulkWriter to handle deletes
    let bulkWriter = db.bulkWriter();

    // Deletes each document from database
    await atlCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        bulkWriter.delete(doc.ref).catch((e) => {
          console.log("error in delete is:", e);
        });
      });
    });

    // Closes bulkWriter connection
    await bulkWriter.close().then(() => {
      console.log("executed all deletes");
    });

    // Sends the response
    res.sendStatus(200);
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};
