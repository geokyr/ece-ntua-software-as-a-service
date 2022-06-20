let admin = require("firebase-admin");
const db = admin.firestore();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    let indexes = [];
    // Read the names of all collections in the database
    await db
      .listCollections()
      .then((snapshot) => {
        snapshot.forEach((snaps) => {
          let q = snaps["_queryOptions"].collectionId;
          // Check if the collection name includes the word PhysicalFlows
          if (q.match(/^PhysicalFlows/)) {
            // Pushes in indexes array the suffix number of all collections with a name like PhysicalFlows + number
            indexes.push(parseInt(q.split("PhysicalFlows")[1]));
          }
        });
      })
      .catch((error) => console.error(error));

    // Get the max value of indexes array
    let suffix = indexes.length === 0 ? 1 : Math.max(...indexes) + 1;
    // Define the new collection name
    let newCollectionName = "PhysicalFlows".concat(suffix);
    let collectionRef = db.collection(newCollectionName);

    // Creates the http request
    await axios
      .get("https://data-provider-hwoybovacq-ey.a.run.app/getFFFile")
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
          if (row.OutAreaTypeCode === "CTY" && row.InAreaTypeCode === "CTY") {
            // Ignore missing values
            let flag = true;

            if (
              !row.DateTime ||
              !row.OutMapCode ||
              !row.InMapCode ||
              !row.FlowValue
            ) {
              flag = false;
            }

            if (flag) {
              // Creates the new object
              let newObject = {};
              newObject.DateTime = new Date(row.DateTime);
              newObject.OutMapCode = row.OutMapCode;
              newObject.InMapCode = row.InMapCode;
              newObject.FlowValue = parseFloat(row.FlowValue);
              // Pushes each document to data array
              data.push(newObject);
            }
          }
        });

        stream.on("end", async () => {
          
          await ParallelBatchedWrites(data);

          async function ParallelBatchedWrites(datas) {
            let batches = [];
            let batch = admin.firestore().batch();
            let count = 0;
            while (datas.length) {
              batch.set(
                collectionRef.doc(Math.random().toString(36).substring(2, 15)),
                datas.shift()
              );
              if (++count >= 500 || !datas.length) {
                batches.push(batch.commit());
                batch = admin.firestore().batch();
                count = 0;
              }
            }
            await Promise.all(batches);
          }

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

/////////////////////////////////////////////////OLD CODE//////////////////////////////////////////////////////////////

// Deletes the old documents from database
//  await collectionRef.get().then(function (querySnapshot) {
//   querySnapshot.forEach(function (doc) {
//     bulkWriter.delete(doc.ref).catch((e) => {
//       console.log("error in delete is:", e);
//     });
//   });
// });

// // Flush bulkWriter
// await bulkWriter
//   .flush()
//   .then(() => {
//     console.log("executed all writes");
//   })
//   .catch((e) => {
//     console.log("error in delete is:", e);
//   });

// // Inserts new documents into database with the updated documents
// data.forEach((doc) => {
//   bulkWriter.create(collectionRef.doc(), doc).catch((e) => {
//     console.log("error in create is:", e);
//   });
// });

// // Flush bulkWriter
// await bulkWriter
//   .flush()
//   .then(() => {
//     console.log("executed all writes");
//   })
//   .catch((e) => {
//     console.log("error in delete is:", e);
//   });
