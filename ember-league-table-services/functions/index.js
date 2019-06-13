const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({
    origin: true
});

function initializeFirebaseAdminSDK(firebaseAdminSDKConfig) {
    firebaseAdminSDKConfig.private_key = firebaseAdminSDKConfig.private_key
        .replace(new RegExp("space", "g"), " ")
        .replace(/\\n/g, "\n");
    admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminSDKConfig),
        databaseURL: "https://ember-league-table.firebaseio.com"
    });
}

initializeFirebaseAdminSDK(functions.config().admin);

exports.helloWorld = functions.https.onRequest((request, response) =>
    response.send("Hello from Firebase!")
);

exports.adminTest = functions.https.onRequest((request, response) =>
    admin.auth().getUserByEmail("test@test.test")
        .then(userRecord => response.send(userRecord.email))
        .catch(error => response.status(500).send(error))
);
