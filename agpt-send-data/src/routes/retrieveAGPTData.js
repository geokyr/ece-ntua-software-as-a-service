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
          // Check if the collection name includes the word AggregatedGenerationPerType
          if (q.match(/^AggregatedGenerationPerType/)) {
            // Pushes in indexes array the suffix number of all collections with a name like AggregatedGenerationPerType + number
            indexes.push(parseInt(q.split("AggregatedGenerationPerType")[1]));
          }
        });
      })
      .catch((error) => console.error(error));

    // Get the max value of indexes array
    let suffix = Math.max(...indexes);
    // Define the new collection name
    let newCollectionName = "AggregatedGenerationPerType".concat(suffix);
    let collectionRef = db.collection(newCollectionName);

    // Initialize the array
    const finalArray = [];
    // Retrieves the data from the database depending on the date, map code and type of generation
    const data = await collectionRef
      .where("DateTime", ">", new Date(req.body.dateFrom))
      .get();

    // Loops through the data and pushes each AggregatedGenerationValue to the finalArray
    data.forEach((doc) => {
      if (
        doc.data().MapCode === req.body.mapCode &&
        doc.data().ProductionType === req.body.productionType
      ) {
        let newObject = {};
        newObject.time = new Date(doc.data().DateTime._seconds * 1000);
        newObject.amount = doc.data().AggregatedGenerationValue;
        finalArray.push(newObject);
      }
    });

    // Order finalArray by time
    finalArray.sort((a, b) => {
      return a.time - b.time;
    });

    // Sends the finalArray to the client
    res.send(finalArray);
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};

