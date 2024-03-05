// ./src/components/homepage/landing.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  const features = [
    {
      title: "Create Your Storefront",
      description: "Empower sellers to design and customize their storefronts.",
    },
    {
      title: "Interact with Buyers",
      description: "Connect with potential buyers and showcase your merchandise.",
    },
    {
      title: "Effortless Merchandise Purchase",
      description: "Buyers can easily view and purchase products from your store.",
    },
  ];

  useEffect(() => {
    // Add animations or interactive features here
    // For example, you can use vanilla JavaScript to create animations
    const landingHeader = document.querySelector(".landing-header");
    const landingFeatures = document.querySelectorAll(".feature");
    const ctaSection = document.querySelector(".cta-section");

    const animateElements = () => {
      landingHeader.classList.add("fade-in");
      landingFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 200}ms`;
        feature.classList.add("fade-in-up");
      });
      ctaSection.classList.add("fade-in");
    };

    animateElements();
  }, []);

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to MarCom</h1>
        <p>Your Hub for Customized Storefronts</p>
      </header>

      <section className="landing-features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="cta-section">
        <Link to="/register" className="cta-button">
          Ready to get started? Join MarCom today!
        </Link>
      </section>
    </div>
  );
}

export default Landing;
