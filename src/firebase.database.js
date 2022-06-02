// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
function obtenerFirestore() {
  const firebaseConfig = {
    apiKey: "AIzaSyDX3nfzUpIPJ71Wf2-3VpKJkHqyWdsHmiQ",
    authDomain: "contactos-e8120.firebaseapp.com",
    projectId: "contactos-e8120",
    storageBucket: "contactos-e8120.appspot.com",
    messagingSenderId: "370863741556",
    appId: "1:370863741556:web:6812829e9c802cf5864f21"
  };

  // Initialize Firebase
  const fireDb = initializeApp(firebaseConfig);

  return getFirestore(fireDb);
}

export default obtenerFirestore;


