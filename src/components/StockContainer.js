import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onStockClick }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map((stock) => (
        <Stock
          key={stock.id}
          stock={stock}
          onClick={() => onStockClick(stock)}
        />
      ))}
    </div>
  );
}

export default StockContainer;
