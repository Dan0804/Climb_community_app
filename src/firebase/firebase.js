
import { initializeApp } from "firebase/app";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa3gT95UmO5jDZhY9X04uPNha8_mRdsFE",
  authDomain: "climb-view-b242e.firebaseapp.com",
  projectId: "climb-view-b242e",
  storageBucket: "climb-view-b242e.appspot.com",
  messagingSenderId: "133425857062",
  appId: "1:133425857062:web:8f4ee24a52646e54d15ce7",
  measurementId: "G-J5QXHV0QWG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const signupEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}
export const db = getFirestore()
export const storage = getStorage()