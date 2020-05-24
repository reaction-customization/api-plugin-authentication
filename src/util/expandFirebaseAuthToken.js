import * as admin from 'firebase-admin';
import config from "../config.js";

const { FIREBASE_DATABASE_URL, GOOGLE_APPLICATION_CREDENTIALS  } = config;

var serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL
});

/**
 * Given an Authorization Bearer token it returns a JSON object with user
 * properties and claims found
 *
 * @name expandAuthToken
 * @method
 * @summary Expands an Auth token
 * @param {String} token Auth token
 * @returns {Object} JSON object
 */
export default async function expandAuthToken(token) {
  try {
    const { uid } = await admin.auth().verifyIdToken(token)
    return { active: true, sub: uid, token_type: 'access_token' }
  } catch(e) {
    console.error(e)
    throw new Error("Error introspecting token")
  }
}
