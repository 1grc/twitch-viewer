import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAInhZJ-PoEwgjwbNaAqODDj7j3X5KWEvI",
  authDomain: "twitchviewer-authorication.firebaseapp.com",
  databaseURL: "https://twitchviewer-authorication.firebaseio.com",
  projectId: "twitchviewer-authorication",
  storageBucket: "twitchviewer-authorication.appspot.com",
  messagingSenderId: "384431140401",
  appId: "1:384431140401:web:862522a7fe259cac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);