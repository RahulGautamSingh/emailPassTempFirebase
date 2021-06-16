import "./main.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Mobile from "./Mobile"
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
  
    console.log("Signed in user", user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default function Main() {
  let history = useHistory();
  let [category, setCategory] = useState(null);
  let logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="main-container">
      <div className="main-navbar">
        <h2>Warehouse Manager</h2>
        <div className="logoutBtn">
          <button className="logout-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="main-body">
        {category === null && (
          <div className="categoryButtons">
            <button
              className="categoryBtn"
              onClick={() => setCategory("mobile")}
            >
              Mobiles
            </button>
            <button
              className="categoryBtn"
              onClick={() => setCategory("laptop")}
            >
              Laptops
            </button>
            <button
              className="categoryBtn"
              onClick={() => setCategory("appliance")}
            >
              Appliances
            </button>
          </div>
        )}
        {category !== null && (
          <div className="category-container">
            <button className="backBtn" onClick={() => setCategory(null)}>← Back</button>
            
                 <Mobile item={category}/>

          </div>
        )}
      </div>
    </div>
  );
}
