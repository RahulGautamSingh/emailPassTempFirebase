import "./main.css"
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log("Signed in user",user)
      // ...
    } else {
      // User is signed out
      // ...

    }
  });
 

  
export default function Main()
{   let history = useHistory()
    let logout = () =>{
      
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          history.push("/")
        }).catch((error) => {
          // An error happened.
        });
        }
    return(
      <div className="main-container">
          <div className="main-navbar">
        <h2>Warehouse Manager</h2>
        <div className="logoutBtn">
        <button className="logout-btn" onClick={logout}>Log Out</button>
        </div>
        
      </div>
      </div>
    )
}