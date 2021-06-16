import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAXwyRpnFpc98hVBVUDxTAdmgvfuE6PCig",
    authDomain: "warehousemanagement-3ccde.firebaseapp.com",
    databaseURL: "https://warehousemanagement-3ccde-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "warehousemanagement-3ccde",
    storageBucket: "warehousemanagement-3ccde.appspot.com",
    messagingSenderId: "955881076974",
    appId: "1:955881076974:web:df843fab249ef280031bff",
    measurementId: "G-J7B46WSCD1"
  };
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const databaseRef = firebase.database();
