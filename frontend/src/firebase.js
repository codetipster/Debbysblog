// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDonnFfUKE1QlDVcKaT5cGtreoiZsVHulE",
  authDomain: "debbysblog-6cda7.firebaseapp.com",
  projectId: "debbysblog-6cda7",
  storageBucket: "debbysblog-6cda7.appspot.com",
  messagingSenderId: "155095521731",
  appId: "1:155095521731:web:be758379c781a47aef8576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };