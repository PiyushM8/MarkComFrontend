import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllMerchants } from "../../../services/user";
import "./sellers.css"; 

function Sellers() {
  const [merchants, setMerchants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllMerchants();
        if (Array.isArray(response.data)) {
          setMerchants(response.data);
        } else {
          console.error("Response does not contain an array of merchants:", response.data);
        }
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMerchants = merchants.filter((merchant) => {
    return merchant.Username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortMerchants = () => {
    const sortedMerchants = [...filteredMerchants].sort((a, b) => {
      if (sortAsc) {
        return a.Username.localeCompare(b.Username);
      } else {
        return b.Username.localeCompare(a.Username);
      }
    });
    setMerchants(sortedMerchants);
    setSortAsc(!sortAsc);
  };

  const isCurrentMerchant = (username) => {
    return location.pathname === `/${username}/sellers`;
  };

  const viewStorefront = (username, event) => {
    event.preventDefault(); 
    console.log(username);
    window.location.href = `/${username}`; // Redirect to the storefront page using the username
  };

  return (
    <div className="all-sellers-container">
      <div className="filter-bar-container">
        <h1 className="search-heading">Start Searching for Sellers!</h1>
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search for sellers"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button onClick={sortMerchants} className="sort-button">
            {sortAsc ? "Sort A-Z" : "Sort Z-A"}
          </button>
        </div>
      </div>
      <div className="merchants-list">
        {filteredMerchants.map((merchant, index) => (
          <div key={index} className="merchant-card">
            <h2>{merchant.Username}</h2>
            <p>Account Type: {merchant.AccountType}</p>
            {isCurrentMerchant(merchant.Username) ? (
              <strong>Hey, that's me!</strong>
            ) : (
              <button
                className="view-storefront-link"
                onClick={(event) => viewStorefront(merchant.Username, event)}
              >
                View Storefront
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sellers;