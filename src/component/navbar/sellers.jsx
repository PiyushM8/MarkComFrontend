import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMerchants } from "../../services/user";
import Navbar from "../navbar/Navbar";
import "./sellers.css";

function Sellers() {
  const [merchants, setMerchants] = useState([]);

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

  const viewStorefront = (username, event) => {
    event.preventDefault(); // Prevent default behavior of the button click
    console.log(username);
    window.location.href = `/${username}`; // Redirect to the storefront page using the username
  };
  
  return (
    <div>
      <Navbar />
      <div className="all-sellers-container">
        <h1>All Merchants</h1>
        <div className="merchants-list">
          {merchants.map((merchant, index) => (
            <div key={index} className="merchant-card">
              <h2>{merchant.Username}</h2>
              <p>Account Type: {merchant.AccountType}</p>
              <button className="view-storefront-link" onClick={(event) => viewStorefront(merchant.Username, event)}>View Storefront</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sellers;
