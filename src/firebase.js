import { createStore, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebae configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKtww3AfzqC-pjcG7wg_dG9UxoNfhlnsc",
  authDomain: "andamiaje-co.firebaseapp.com",
  databaseURL: "https://andamiaje-co.firebaseio.com",
  projectId: "andamiaje-co",
  storageBucket: "andamiaje-co.appspot.com",
  messagingSenderId: "222496116746"
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase config
const reduxFirebaseConfig = {
  userProfile: 'users',
  // enableLogging: true, // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, reduxFirebaseConfig),
)(createStore)
