import { useState } from "react";
import { useEffect } from "react";
import { databaseRef } from "./firebaseConfig";
import "./mobile.css";
import Card from "./Card";
import Form from "./Form";
import "firebase/auth";
export default function Mobile(props) {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [creativeMode, setCreativeMode] = useState(false);

  async function delMobile(info) {
    console.log(info[0]);
    await databaseRef.ref(props.item + "/" + info[0]).remove();
    fetchData();
  }
  let changeMode = () => {
    if (creativeMode === true) fetchData();
    setCreativeMode(!creativeMode);
  };

  async function fetchData() {
    await databaseRef
      .ref()
      .child(props.item)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          let arr = Object.entries(snapshot.val());
          console.log(arr);
          setData(arr);
        } else {
          console.log("No data available");
        }
      });
    setLoading(false);
  }
  useEffect(()=>{
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mobile-container">
      <div
        className="dark"
        style={{ display: creativeMode ? "block" : "none" }}
      ></div>
      <button className="createBtn" onClick={changeMode}>
        {!creativeMode ? "Add New " + props.item : "Close"}
      </button>
      {creativeMode && <Form clickHandler={changeMode} itemtype={props.item} />}
      {!loading &&
        data.map((mobile) => {
          return <Card item={mobile} clickHandler={delMobile} />;
        })}
      {loading && <h1>Loading...</h1>}
    </div>
  );
}
