import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/productThunk";

const ProductList = () => {
  useEffect(() => {
    dispatch(fetchProduct());
  }, [fetchProduct]);

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  console.log("products",products)

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading....</h1>;
  }

  if (error) {
    return <h1 style={{ textAlign: "center" }}>{error}</h1>;
  }

  return (
    <>
      <table border={5} >
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <img
                    src={p.image}
                    alt="product image"
                    style={{ height: "100px" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
