// ./src/components/homepage/landing.jsx

import React from "react";
import "./landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to MarCom</h1>
        <p>Your Hub for Customized Storefronts</p>
      </header>
      
      <section className="landing-features">
        <div className="feature">
          <h2>Create Your Storefront</h2>
          <p>Empower sellers to design and customize their storefronts.</p>
        </div>
        
        <div className="feature">
          <h2>Interact with Buyers</h2>
          <p>Connect with potential buyers and showcase your merchandise.</p>
        </div>
        
        <div className="feature">
          <h2>Effortless Merchandise Purchase</h2>
          <p>Buyers can easily view and purchase products from your store.</p>
        </div>
      </section>
      
      <section className="cta-section">
        <p>Ready to get started? Join MarCom today!</p>
        <button className="cta-button">Sign Up</button>
      </section>
    </div>
  );
}

export default Landing;
