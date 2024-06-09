import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj9S8bqj8ydqCq8ypaXSWVhZl5bEMnGPs",
  authDomain: "connect-able.firebaseapp.com",
  projectId: "connect-able",
  storageBucket: "connect-able.appspot.com",
  messagingSenderId: "237284865041",
  appId: "1:237284865041:web:091f3503e2c2a87fc66db0",
  measurementId: "G-TNKJ7ZH09C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencing the events collection
const eventsCollection = collection(db, 'events');

// Getting the host form
const hostingForm = document.getElementById('hosting-form');

hostingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const hostName = document.getElementById('hostName').value;
  const eventTitle = document.getElementById('eventTitle').value;
  const eventType = document.getElementById('inputEvent').value;
  const eventTime = Date.parse(document.getElementById('eventTime').value);
  const eventLocation = document.getElementById('inputLocation').value;
  const eventDescription = document.getElementById('eventDescription').value;

  // Convert the datetime-local string to a Date object
  const eventDate = new Date(eventTime);

  // Convert the Date object to a Firestore Timestamp
  const eventTimestamp = Timestamp.fromDate(eventDate);

  try {
    await addDoc(eventsCollection, {
      hostName: hostName,
      title: eventTitle,
      eventType: eventType,
      date: eventTimestamp,
      location: eventLocation,
      description: eventDescription
    });
    alert('Event successfully added!');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
});
