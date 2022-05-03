import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCahFmCp9YP1xzPiLbBYSNutOvzqbwTl2o",
  authDomain: "react-firebase-e230c.firebaseapp.com",
  projectId: "react-firebase-e230c",
  storageBucket: "react-firebase-e230c.appspot.com",
  messagingSenderId: "574829494341",
  appId: "1:574829494341:web:289de1d0bff22656d2632c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth} 