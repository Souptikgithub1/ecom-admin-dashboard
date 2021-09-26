// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRL7cw8rrXbEImNmSwyZeTP1cL5yzdTnA",
    authDomain: "ecom-admin-dashboard.firebaseapp.com",
    projectId: "ecom-admin-dashboard",
    storageBucket: "ecom-admin-dashboard.appspot.com",
    messagingSenderId: "457400356805",
    appId: "1:457400356805:web:bba083d1cae5a9993d05ac",
    measurementId: "G-HNL67GH50P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();

export {projectStorage, firebase as default}