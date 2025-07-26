import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("None");
  const [filterBy, setFilterBy] = useState("All");

  // Fetch all stocks once on mount
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  // Add to portfolio
  function handleBuyStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  // Remove from portfolio
  function handleSellStock(stock) {
    const updated = portfolio.filter((s) => s.id !== stock.id);
    setPortfolio(updated);
  }

  // Handle sort change
  function handleSortChange(value) {
    setSortBy(value);
  }

  // Handle filter change
  function handleFilterChange(value) {
    setFilterBy(value);
  }

  // Apply filter
  const filteredStocks = stocks.filter((stock) => {
    return filterBy === "All" || stock.type === filterBy;
  });

  // Apply sort
  const sortedStocks = [...filteredStocks];
  if (sortBy === "Alphabetically") {
    sortedStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
  } else if (sortBy === "Price") {
    sortedStocks.sort((a, b) => a.price - b.price);
  }

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} onStockClick={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onStockClick={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
