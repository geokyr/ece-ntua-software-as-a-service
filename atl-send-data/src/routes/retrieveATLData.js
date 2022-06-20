let admin = require("firebase-admin");
const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    let indexes = [];
    // Read the names of all collections in the database
    await db
      .listCollections()
      .then((snapshot) => {
        snapshot.forEach((snaps) => {
          let q = snaps["_queryOptions"].collectionId;
          // Check if the collection name includes the word ActualTotalLoad
          if (q.match(/^ActualTotalLoad/)) {
            // Pushes in indexes array the suffix number of all collections with a name like ActualTotalLoad + number
            indexes.push(parseInt(q.split("ActualTotalLoad")[1]));
          }
        });
      })
      .catch((error) => console.error(error));

    // Get the max value of indexes array
    let suffix = Math.max(...indexes);
    // Define the new collection name
    let newCollectionName = "ActualTotalLoad".concat(suffix);
    let collectionRef = db.collection(newCollectionName);

    // Initialize the array
    const finalArray = [];

    // Retrieves the data from the database depending on the date and map code
    const data = await collectionRef
      .where("DateTime", ">", new Date(req.body.dateFrom))
      .get();

    // Loops through the data and pushes each totalLoadValue to the finalArray
    data.forEach((doc) => {
      // Checks if the map code is the same as the one in the request 
      if (doc.data().MapCode === req.body.mapCode) {
        let newObject = {};
        newObject.time = new Date(doc.data().DateTime._seconds * 1000);
        newObject.amount = doc.data().TotalLoadValue;
        finalArray.push(newObject);
      }
    });

    // Order finalArray by time
    finalArray.sort((a, b) => {
      return a.time - b.time;
    })

    // Sends the finalArray to the client
    res.send(finalArray);
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};

//////////////////////// NOTES ///////////////////////////

// Params:
// First Param = Quantity
// If (Quantity == Actual total load) then otherParams = {DateFrom, Country}
// If (Quantity == Generation per type) then otherParams = {DateFrom, Country, GenerationType}
// If (Quantity == Cross border flows) then otherParams = {DateFrom, Country(from), Country(to))
