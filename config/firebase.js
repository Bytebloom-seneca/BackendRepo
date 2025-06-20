const admin = require("firebase-admin");
//const serviceAccount = require("./firebaseServiceAccountKey.json");
const path = require("path");
const serviceAccountPath =
  process.env.FIREBASE_CREDENTIAL_PATH || path.join(__dirname, "firebaseServiceAccountKey.json");

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
