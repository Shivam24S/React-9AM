import React from "react";
import Counter from "./concept/Counter";
import { useSelector } from "react-redux";
import Add from "./components/add";
import ProductsList from "./components/ProductsList";
import InventoryStats from "./components/InventoryStats";

const App = () => {
  return (
    <>

{/* concept */}

      {/* <Counter /> */}



      {/* project */}

      <InventoryStats/>

      <Add/>

      <br />
      <br />

      <ProductsList/>
    </>
  );
};

export default App;
