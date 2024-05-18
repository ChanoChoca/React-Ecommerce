// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuKhNCH6GI7M5ZODxV6aqa64GquNdl4js",
    authDomain: "worldoftanks-app.firebaseapp.com",
    projectId: "worldoftanks-app",
    storageBucket: "worldoftanks-app.appspot.com",
    messagingSenderId: "252357144338",
    appId: "1:252357144338:web:5dba065b1b7d3631d3cdcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
