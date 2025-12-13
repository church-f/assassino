import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCR2OgNQeQjhwaZnnF-C1nTTlc3k7gnuhk",
    authDomain: "assassino-eb029.firebaseapp.com",
    projectId: "assassino-eb029",
    storageBucket: "assassino-eb029.firebasestorage.app",
    messagingSenderId: "413537168658",
    appId: "1:413537168658:web:cd6afb308406687aa197cb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };