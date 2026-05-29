import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8GWwRFhQQVHhA-AbSplogFnNa1LKS9Mo",
  authDomain: "al-ichraq-site.firebaseapp.com",
  projectId: "al-ichraq-site",
  storageBucket: "al-ichraq-site.firebasestorage.app",
  messagingSenderId: "765262070685",
  appId: "1:765262070685:web:43782724abae4a209ca574",
  measurementId: "G-C7Q37GF35C"
};

const app = initializeApp(firebaseConfig);

// On exporte les services pour les utiliser ailleurs
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);