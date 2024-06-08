import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

const expressApp = async (req, res) => {
  const { expressApp } = await import('../app.js');
  return expressApp(req, res);
};

export const app = onRequest(expressApp);

// Example function (uncomment if needed)
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
