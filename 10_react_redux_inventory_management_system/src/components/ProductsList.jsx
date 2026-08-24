import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDelete, setEditValue } from "../features/inventorySlice";

const ProductsList = () => {
  const products = useSelector((state) => state.inventory.products);

  const dispatch = useDispatch();

  const [productQuery, setProductQuery] = useState({
    search: "",
    sort: "asc",
  });

  const handleChange = (field, e) => {
    setProductQuery((prod) => {
      return {
        ...prod,
        [field]: e.target.value,
      };
    });
  };

  const filterList = products.filter((prod) =>
    prod.name.toLowerCase().includes(productQuery.search.toLowerCase()),
  );

  const sortedList = [...filterList].sort((a, b) => {
    if (productQuery.sort === "asc") {
      return a.id - b.id;
    }

    if (productQuery.sort === "desc") {
      return b.id - a.id;
    }

    if (productQuery.sort === "priceAscending") {
      return Number(a.price) - Number(b.price);
    }

    if (productQuery.sort === "priceDescending") {
      return Number(b.price) - Number(a.price);
    }

    if (productQuery.sort === "QtyAsc") {
      return Number(a.qty) - Number(b.qty);
    }

    if (productQuery.sort === "QtyDesc") {
      return Number(b.qty) - Number(a.qty);
    }
  });

  return (
    <>
      <input
        type="text"
        value={productQuery.search}
        placeholder="enter product name"
        onChange={(e) => handleChange("search", e)}
      />

      <select
        value={productQuery.sort}
        onChange={(e) => handleChange("sort", e)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        <option value="priceAscending">Price Ascending</option>
        <option value="priceDescending">Price Descending</option>
        <option value="QtyAsc">Quantity Ascending</option>
        <option value="QtyDesc">Quantity Descending</option>
      </select>

      <br />
      <br />

      {products.length > 0 ? (
        <table border={2}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((p, index) => {
              return (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.qty}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <button onClick={() => dispatch(setEditValue(p.id))}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => dispatch(handleDelete(p.id))}>
                      {" "}
                      Delete
                    </button>
                  </td>
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
