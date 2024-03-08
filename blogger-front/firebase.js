// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATC7WDGJg2NJtHy6mxvBNxk4N60dOFJFE",
  authDomain: "propics-fde49.firebaseapp.com",
  projectId: "propics-fde49",
  storageBucket: "propics-fde49.appspot.com",
  messagingSenderId: "1082948600818",
  appId: "1:1082948600818:web:c34b2c00b72abc9b21616b",
  measurementId: "G-DTDRQYNR06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
