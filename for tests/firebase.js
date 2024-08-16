import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  get,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuKwOk23zqTp-BJltZNji9uCfAzG2dHeo",
  authDomain: "practice-fb-5e162.firebaseapp.com",
  projectId: "practice-fb-5e162",
  storageBucket: "practice-fb-5e162.appspot.com",
  messagingSenderId: "502175259886",
  appId: "1:502175259886:web:30de0b49b8ff12e2b267ff",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  db,
  set,
  ref,
  get,
  remove,
  update,
};
