import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, handleEdit } from "../features/inventorySlice";

const Add = () => {
  const products = useSelector((state) => state.inventory.products);

  const editValue = useSelector((state) => state.inventory.editValue);

  console.log("edit value",editValue)

  const dispatch = useDispatch();

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

  useEffect(() => {
    editValue ? setInputs(editValue) : null;
  }, [editValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editValue) {
      dispatch(handleEdit(inputs));
      setInputs({ name: "", qty: 0, price: 0, category: "" });
    } else {
      dispatch(add(inputs));
      setInputs({ name: "", qty: 0, price: 0, category: "" });
    }
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

      <button type="submit">{editValue ? "update":"add"}</button>
    </form>
  );
};

export default Add;
