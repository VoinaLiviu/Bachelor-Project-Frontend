import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWT3QAf-0KI6QxAqhghpoNM2IjxLftcsE",
    authDomain: "react-firebase-auth-d2276.firebaseapp.com",
    projectId: "react-firebase-auth-d2276",
    storageBucket: "react-firebase-auth-d2276.appspot.com",
    messagingSenderId: "565140463517",
    appId: "1:565140463517:web:681bc5ad99ca1c52171974"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }