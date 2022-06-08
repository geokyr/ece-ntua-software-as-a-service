let admin = require("firebase-admin");
const db = admin.firestore();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Defines the collection of the firestore database
let collectionRef = db.collection("AggregatedGenerationPerType");

// Create a bulkWriter to handle writes
let bulkWriter = db.bulkWriter();

module.exports = async (req, res) => {
  try {
    // Creates the http request
    await axios
      .get("https://data-provider-hwoybovacq-ey.a.run.app/getAGPTFile")
      .then((response) => {
        
        // Creates temporary file
        fs.appendFileSync("tempFile.txt", response.data, function (err) {
          if (err) throw err;
          console.log("File saved!");
        });

        const coolPath = path.join(__dirname, "../../tempFile.txt");
        const data = [];

        // Initialize the stream
        const stream = fs
          .createReadStream(coolPath)
          .pipe(csv({ separator: "\t" }));

        // Error handling
        stream.on("error", (err) => {
          console.log(err);
        });

        stream.on("data", (row) => {
          // Checks if AreaTypeCode equals to CTY
          if (row.AreaTypeCode === "CTY") {
            // Ignore missing values
            let flag = true;

            if (
              !row.DateTime ||
              !row.MapCode ||
              !row.ProductionType ||
              (!row.ActualGenerationOutput && !row.ActualConsumption)
            ) {
              flag = false;
            }

            if (flag) {
              // Creates the new object
              let newObject = {};
              newObject.DateTime = new Date(row.DateTime);
              newObject.MapCode = row.MapCode;
              newObject.ProductionType = row.ProductionType;
              newObject.AggregatedGenerationValue = parseFloat(
                (row.ActualGenerationOutput ? row.ActualGenerationOutput : 0) -
                  (row.ActualConsumption ? row.ActualConsumption : 0)
              );
              // Pushes each document to data array
              data.push(newObject);
            }
          }
        });

        stream.on("end", async () => {
          // Deletes the old documents from database
          await collectionRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              bulkWriter.delete(doc.ref).catch((e) => {
                console.log("error in delete is:", e);
              });
            });
          });

          // Flush bulkWriter
          await bulkWriter
            .flush()
            .then(() => {
              console.log("executed all writes");
            })
            .catch((e) => {
              console.log("error in delete is:", e);
            });

          // Inserts new documents into database with the updated documents
          data.forEach((doc) => {
            bulkWriter.create(collectionRef.doc(), doc).catch((e) => {
              console.log("error in create is:", e);
            });
          });

          // Flush bulkWriter
          await bulkWriter
            .flush()
            .then(() => {
              console.log("executed all writes");
            })
            .catch((e) => {
              console.log("error in delete is:", e);
            });

          // Deletes the temporary file
          fs.unlinkSync("tempFile.txt", function (err) {
            if (err) throw err;
            console.log("File deleted!");
          });

          // Sends status 200 if the request had success
          res.status(200).send({ title: response.headers.title });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};
