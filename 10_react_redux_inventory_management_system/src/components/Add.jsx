import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/inventorySlice";

const Add = () => {
  const products = useSelector((state) => state.inventory.products);

  const dispatch = useDispatch();


  console.log("products",products)


  const [inputs, setInputs] = useState({
    name: "",
    qty: 0,
    price: 0,
    category: "",
  });

  const handleChange = (field, e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(add(inputs));

    setInputs({ name: "", qty: 0, price: 0, category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="enter product name"
        value={inputs.name}
        onChange={(e) => handleChange("name", e)}
      />
      <br />
      <br />
      <label htmlFor="quantity">quantity</label>
      <input
        type="number"
        placeholder="enter product quantity"
        value={inputs.qty}
        onChange={(e) => handleChange("qty", e)}
      />
      <br />
      <br />

      <label htmlFor="price">price</label>
      <input
        type="number"
        placeholder="enter product price"
        value={inputs.price}
        onChange={(e) => handleChange("price", e)}
      />
      <br />
      <br />

<label htmlFor="category">category</label>
      <input
        type="text"
        placeholder="enter product category"
        value={inputs.category}
        onChange={(e) => handleChange("category", e)}
      />

      <br />
      <br />

      <button type="submit">submit</button>
    </form>
  );
};

export default Add;
