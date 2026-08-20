import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDelete, setEditValue } from "../features/inventorySlice";

const ProductsList = () => {
  const products = useSelector((state) => state.inventory.products);

const dispatch = useDispatch();



  return (
    <>
      {products.length > 0 ? (
        <table border={2}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th colSpan={2} >Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              return (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.qty}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td><button onClick={()=>dispatch(setEditValue(p.id))} >Edit</button></td>
                  <td><button onClick={()=>dispatch(handleDelete(p.id))} > Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>No Products Data found</h1>
      )}
    </>
  );
};

export default ProductsList;
