import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithCredential , createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// const googleCredential = credential.GoogleAuthProvider(id_token);

const googleSignInBtn = document.getElementById('google-btn');
const fbSignInBtn = document.getElementById('facebook-btn');
const emailSignInForm = document.getElementById('email-signin-form');

// Google authentication
googleSignInBtn.onclick = () => {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  // console.log(user);
  // console.log(token);
window.location.href = "/events/";
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

// Facebook authentication
fbSignInBtn.onclick = () => {
  signInWithPopup(auth, facebookProvider)
    .then(result => {
      // Sending the ID token to the server for verification
      sendTokenToServer(result.user.getIdToken());
    })
    .catch(error => {
      console.error('Error signing in with Facebook:', error);
    });
}

// Email authentication
emailSignInForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      // Sending the ID token to the server for verification
      sendTokenToServer(result.user.getIdToken());
    })
    .catch(error => {
      console.error('Error signing in with Email:', error);
    });
}

document.getElementById('email-signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(result => {
      // Sending the ID token to the server for verification
      sendTokenToServer(result.user.getIdToken());
    })
    .catch(error => {
      console.error("Error signing up with Email : ", error);
    });
})

function sendTokenToServer(idToken) {
  fetch('/verifyToken', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/events'; // Redirect to events page
    } else {
      console.error('Failed to verify token on the server');
    }
  })
  .catch(error => {
    console.error('Error sending token to server:', error);
  });
}
