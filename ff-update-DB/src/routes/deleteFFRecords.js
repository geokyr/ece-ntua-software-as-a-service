let admin = require("firebase-admin");
const db = admin.firestore();

module.exports = async (req, res) => {
  try {
    console.log("deleteFFRecords called");
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
      .catch((error) => {
        throw new Error();
      });
    // If there are old collections then delete them
    if (indexes.length > 1) {
      // Remove from indexes array the largest value that corresponds to the last updated collection
      const max = Math.max(...indexes);
      let newIndexes = indexes.filter((index) => index !== max);
      // loop through all indexes except the last one
      for (let i = 0; i < newIndexes.length; i++) {
        let collectionRef = db.collection("PhysicalFlows" + newIndexes[i]);

        // [START delete_collection]
        await deleteCollection(500);

        async function deleteCollection(batchSize) {
          const query = collectionRef.limit(batchSize);

          return new Promise((resolve, reject) => {
            deleteQueryBatch(db, query, resolve).catch(reject);
          });
        }

        async function deleteQueryBatch(db, query, resolve) {
          const snapshot = await query.get();
          const batchSize = snapshot.size;
          if (batchSize === 0) {
            // When there are no documents left, we are done
            resolve();
            return;
          }

          // Delete documents in a batch
          const batch = db.batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });
          await batch.commit();

          // Recurse on the next process tick, to avoid
          // exploding the stack.
          process.nextTick(() => {
            deleteQueryBatch(db, query, resolve);
          });
        }
        console.log("ends deleting");
      }
    } else {
      // There are no old collections to delete
      console.log("No collections to delete");
    }
  } catch (e) {
    // Sends error message
    res.status(400).send(e);
  }
};
