let admin = require("firebase-admin");

let serviceAccount = require("./saas2022-19-firebase-adminsdk-ubqtu-6afcec7b2c");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
