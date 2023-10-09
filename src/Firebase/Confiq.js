import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7w2-NS6L0j8GsoPHcjP3qwM0y9wgH3tI",
  authDomain: "d-registration-39417.firebaseapp.com",
  projectId: "d-registration-39417",
  storageBucket: "d-registration-39417.appspot.com",
  messagingSenderId: "911621171085",
  appId: "1:911621171085:web:b703ff45a1333a3bb97fc4",
  measurementId: "G-722V5MKLBJ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);