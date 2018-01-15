import { createStore, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebae configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDfnoTqolYAjy2WvuxsPGJ7t7oycUjAVR4',
  authDomain: 'igv-andamiaje-co.firebaseapp.com',
  databaseURL: 'https://igv-andamiaje-co.firebaseio.com',
  projectId: 'igv-andamiaje-co',
  storageBucket: 'igv-andamiaje-co.appspot.com',
  messagingSenderId: '796880348739',
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
