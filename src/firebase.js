// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqghxMiq0nYi_cTtYTkIxjhm5B40Arwic",
  authDomain: "task-manager-auth-45536.firebaseapp.com",
  projectId: "task-manager-auth-45536",
  storageBucket: "task-manager-auth-45536.firebasestorage.app",
  messagingSenderId: "777745056491",
  appId: "1:777745056491:web:1e148ecd9e614cd52034ae",
  measurementId: "G-0GKZKPHDPQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();