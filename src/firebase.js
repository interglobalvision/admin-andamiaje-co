import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAKtww3AfzqC-pjcG7wg_dG9UxoNfhlnsc",
  authDomain: "andamiaje-co.firebaseapp.com",
  databaseURL: "https://andamiaje-co.firebaseio.com",
  projectId: "andamiaje-co",
  storageBucket: "andamiaje-co.appspot.com",
  messagingSenderId: "222496116746"
};

export const firebaseApp = firebase.initializeApp(config);
export const usersRef = firebase.database().ref('users');
export const messageRef = firebase.database().ref('messages');
