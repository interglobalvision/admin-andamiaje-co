import { createStore, compose, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import LogRocket from 'logrocket';

// Logrocket
LogRocket.init('2xmblo/andamiaje');

let middlewares = [];
// Set middlewares
if(process.env.NODE_ENV === 'production') {
  middlewares = [LogRocket.reduxMiddleware()];
}

// Firebae configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// react-redux-firebase config
const reduxFirebaseConfig = {
  userProfile: 'users',
  //enableLogging: true, // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, reduxFirebaseConfig),
  applyMiddleware(...middlewares),
)(createStore)
