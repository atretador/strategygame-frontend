import React from "react";
import "./LandingPage.css"; // Import the custom CSS

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Strategy Game</h1>
        <p>Conquer your opponents and build your empire!</p>
      </header>

      <section className="landing-content">
        <h2>About the Game</h2>
        <p>
          Embark on an epic journey where strategy and tactics will determine your
          success. Build cities, manage resources, and command armies to defeat your
          foes. Will you rise to the top and become the ruler of the land?
        </p>
        <div className="landing-buttons">
          <a href="/Dashboard" className="btn">Play Now</a>
          <a href="/about" className="btn">Learn More</a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;