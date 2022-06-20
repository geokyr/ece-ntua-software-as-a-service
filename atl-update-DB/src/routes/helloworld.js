let admin = require("firebase-admin");
const db = admin.firestore();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const moment = require("moment");

// Defines the collection of the firestore database
let collectionRef = db.collection("ActualTotalLoad");
let indexes = [];
module.exports = async (req, res) => {
  try {
    await db.listCollections()
      .then((snapshot) => {
        snapshot.forEach((snaps) => {
          let q = snaps["_queryOptions"].collectionId;
          if (q.match(/^ActualTotalLoad/)) {
            indexes.push(q.split("ActualTotalLoad")[1]);
          }
        });
      })
      .catch((error) => console.error(error));
   
      res.sendStatus(200);
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};

// module.exports = async (req, res) => {
//   res.send("Hello from actual-total-load microservice!");
// };
