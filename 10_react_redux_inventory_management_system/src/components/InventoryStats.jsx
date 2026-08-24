import { useSelector } from "react-redux";

const InventoryStats = () => {
  const products = useSelector((state) => state.inventory.products);

  const valuation = products.reduce((acc, curr) => {
    return (acc += curr.price * curr.qty);
  }, 0);

  const highStocks = products.filter((p) => p.qty > 10).length;

  const lowStocks = products.filter((p) => p.qty <= 10).length;

  return (
    <>
      <h1>Total Products:- {products.length} </h1>

      <br />
      <br />

      <h1>Total Valuation:- {valuation} </h1>

      <br />
      <br />

      <h1>High Stocks products:- {highStocks} </h1>

      <br />
      <br />

      <h1>Low Stocks products:- {lowStocks} </h1>
    </>
  );
};

export default InventoryStats;
