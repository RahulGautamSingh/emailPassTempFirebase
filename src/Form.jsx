import {  useRef } from "react";
import "./form.css";
import firebase from "firebase/app";
import "firebase/auth";
export default function Form(props) {
  let name = useRef();
  let price = useRef();
  let quantity = useRef();
  let image = useRef();
  let desc = useRef();

  function addData(item) {
    firebase
      .database()
      .ref(props.itemtype + "/" + name.current.value)
      .set(
        {
          price: price.current.value,
          quantity: quantity.current.value,
          description: desc.current.value,
          image: image.current.value,
        },
        (error) => {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
      );
  }
  return (
    <div className="form">
      <label htmlFor="item-name">Name</label>
      <input type="text" className="item-name" name="item-name" ref={name} />
      <label htmlFor="item-price">Price</label>
      <input type="text" className="item-price" name="item-price" ref={price} />
      <label htmlFor="item-quaantity">Quantity</label>
      <input
        type="text"
        className="item-quantity"
        name="item-quantity"
        ref={quantity}
      />
      <label htmlFor="item-description">Decription</label>
      <input
        type="text"
        className="item-description"
        name="item-description"
        ref={image}
      />
      <label htmlFor="item-image">Image Url</label>
      <input type="text" className="item-image" name="item-image" ref={desc} />
      <button
        onClick={() => {
          addData();

          props.clickHandler();
        }}
      >
        Add
      </button>
    </div>
  );
}
