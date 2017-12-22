import { createStore, compose } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAKtww3AfzqC-pjcG7wg_dG9UxoNfhlnsc",
  authDomain: "andamiaje-co.firebaseapp.com",
  databaseURL: "https://andamiaje-co.firebaseio.com",
  projectId: "andamiaje-co",
  storageBucket: "andamiaje-co.appspot.com",
  messagingSenderId: "222496116746"
};

const reduxFirebaseConfig = {
  userProfile: 'users',
  // enableLogging: true, // enable/disable Firebase's database logging
};

// Add redux Firebase to compose
export const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore)
