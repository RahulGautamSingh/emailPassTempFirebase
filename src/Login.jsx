import { useRef, useContext, useState } from "react";
import { databaseRef } from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";
import DatabaseContext from "./context";
import "./Login.css";
function Login() {
  let ContextData = useContext(DatabaseContext);
  let emailRefL = useRef();
  let passwordRefL = useRef();
  let emailRefS = useRef();
  let passwordRefS = useRef();
  let usernameRef = useRef();
  let ageRef = useRef();
  let countryRef = useRef();
  let history = useHistory();

  let [filter, setFilter] = useState("login");
  let [error,setError] = useState(false)
  function login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        emailRefL.current.value,
        passwordRefL.current.value
      )
      .then(async function (userCredential) {
        // Signed in

        var user = userCredential.user;
        let userId = user.email.replaceAll(".", "_");

        await databaseRef
          .ref()
          .child("users/" + userId)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              ContextData.dispatch(["curr_user", snapshot.val()]);
              console.log(ContextData);
            } else {
              console.log("No data available");
            }
          });
        // eslint-disable-next-line

        console.log(user);

        history.push("/main");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        emailRefL.current.value = "";
        passwordRefL.current.value = "";
        setError([true,error.message])
      });
  }
  function signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        emailRefS.current.value,
        passwordRefS.current.value
      )
      .then(async (userCredential) => {
        // Signed in

        var user = userCredential.user;
        let userId = user.email.replaceAll(".", "_");
        ContextData.dispatch(["curr_user", userId]);
        console.log(user);
        await databaseRef
          .ref("users/" + userId)
          .set({
            username: usernameRef.current.value,
            email: emailRefS.current.value,
            age: ageRef.current.value,
            country: countryRef.current.value,
          })
          .catch((error) => console.log("error", error));

        history.push("/main");

        // ...
      })
      .catch((error) => {
       
        var errorMessage = error.message;
        setError([true,errorMessage])
       

        // ..
      });
  }
  return (
    <div className="container">
      <div className="navbar">
        <h2>Warehouse Manager</h2>
      </div>
      <div className="main">
        <div className="card">
          <div className="filter-buttons">
            <button
              onClick={() => 
                { setFilter("login")
                    setError([false,""])
                }
               }
              className={
                filter === "login" ? "filterBtn active" : "filterBtn inactive"
              }
            >
              LOGIN
            </button>
            <button
              onClick={() => {
                  setFilter("signup")
                setError([false,""])
              }}
              className={
                filter !== "login" ? "filterBtn active" : "filterBtn inactive"
              }
            >
              SIGNUP
            </button>
          </div>

          { filter === "login" ? (
            <div className="login-section">
              <input type="email" ref={emailRefL} placeholder="email" />
              <input
                type="password"
                ref={passwordRefL}
                placeholder="password"
              />
              <button className="login-btn" onClick={login}>
                Login
              </button>
            </div>
          ) : (
            <div className="signup-section">
              <input type="email" ref={emailRefS} placeholder="email" />
              <input
                type="password"
                ref={passwordRefS}
                placeholder="password"
              />
              <input type="text" ref={usernameRef} placeholder="name" />
              <input type="number" ref={ageRef} placeholder="age" />
              <input type="text" ref={countryRef} placeholder="country" />
              <button className="login-btn" onClick={signUp}>
                Signup
              </button>
            </div>
          )}
          {error[0] && 
          <p style={{fontSize:"13px"}}>{error[1]}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
