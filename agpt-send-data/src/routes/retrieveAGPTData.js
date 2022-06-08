let admin = require("firebase-admin");
const db = admin.firestore();

// Defines the collection of the firestore database
let collectionRef = db.collection("AggregatedGenerationPerType");

module.exports = async (req, res) => {
  try {
    // Initialize the array
    const finalArray = [];
    // Retrieves the data from the database depending on the date, map code and type of generation
    const data = await collectionRef
      .where("DateTime", ">", new Date(req.body.dateFrom))
      .where("MapCode", "==", req.body.mapCode)
      .where("ProductionType", "==", req.body.productionType)
      .orderBy("DateTime",'asc') // Sorts the data by date
      .get();

    // Loops through the data and pushes each AggregatedGenerationValue to the finalArray
    data.forEach((doc) => {
      let newObject = {}
      newObject.time = new Date(doc.data().DateTime._seconds*1000)
      newObject.amount = doc.data().AggregatedGenerationValue
      finalArray.push(newObject);
    });
    

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
