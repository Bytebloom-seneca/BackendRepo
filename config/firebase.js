const admin = require("firebase-admin");
//const serviceAccount = require("./firebaseServiceAccountKey.json");
const path = require("path");
const serviceAccount = require(path.join(
  process.env.FIREBASE_CREDENTIAL_PATH || "./config/firebaseServiceAccountKey.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
