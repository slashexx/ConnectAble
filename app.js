// app.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getDocs, doc, getDoc } from "firebase/firestore";
import { app, auth, db, googleProvider, facebookProvider, eventsCollection, admin } from './firebaseI.js';
import replace from './modules/replaceTemplate.js'; // Fix path and import



// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expressApp = express();
const port = 3000;

// Middleware to parse JSON
expressApp.use(express.json());

const tempEvent = fs.readFileSync(path.join(__dirname, 'template', 'template-deetevent.html'), 'utf8');

// Serve static files from the 'public' directory
expressApp.use(express.static(path.join(__dirname, 'public')));

// Middleware to check authentication
// const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     console.log('No token provided, redirecting to /login');
//     return res.redirect('/login');
//   }

//   const idToken = authHeader.split('Bearer ')[1];
//   try {
//     const decodedToken = await adminAuth.verifyIdToken(idToken);
//     req.user = decodedToken;
//     console.log('Token verified:', decodedToken);
//     next();
//   } catch (error) {
//     console.log('Token verification failed:', error);
//     return res.redirect('/login');
//   }
// };

// // Endpoint to verify token
// expressApp.post('/verifyToken', async (req, res) => {
//   const idToken = req.body.idToken;
//   try {
//     const decodedToken = await adminAuth.verifyIdToken(idToken);
//     req.user = decodedToken;
//     res.status(200).send('Token verified');
//   } catch (error) {
//     console.log('Token verification failed:', error);
//     res.status(401).send('Unauthorized');
//   }
// });
// Serve the login page
expressApp.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Send 'index.html' on the root route
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch events data
expressApp.get('/events', async (req, res) => {
  const snapshot = await getDocs(eventsCollection);
  const eventCards = fs.readFileSync(path.join(__dirname, 'template', 'event-card.html'), 'utf8');
  const cardsHtml = snapshot.docs.map(element => {
    const eventData = element.data();
    eventData.id = element.id; // Include the document ID
    return replace(eventCards, eventData);
  }).join('');
  const output = fs.readFileSync(path.join(__dirname, 'template', 'template-events.html'), 'utf8').replace(/{%EVENT_CARDS%}/g, cardsHtml);
  res.status(200).send(output);
});

// Endpoint to fetch event-specific data
expressApp.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;
  const eventDocRef = doc(db, "events", eventId);
  const eventDocSnapshot = await getDoc(eventDocRef);

  if (eventDocSnapshot.exists()) {
    const eventData = eventDocSnapshot.data();
    const output = replace(tempEvent, eventData);
    res.status(200).send(output);
  } else {
    res.status(404).send('Event not found');
  }
})

// Start the server
expressApp.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export { expressApp };
