import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="section-content">
          <h1>Welcome to UniMarket</h1>
          <p>Your one-stop destination for all your shopping needs.</p>
        </div>
      </header>

      <section className="intro-section">
        <div className="section-content">
          <h2>What is UniMarket?</h2>
          <p>
            UniMarket is a University marketplace where students come together to buy, sell, and explore unique products. We are committed to making a positive impact on small businesses, people, and the planet.
          </p>
          <a href="#learn-more">Learn more about our story</a>
        </div>
      </section>

      <section className="features-section">
        <div className="section-content">
          <div className="feature">
            <h3>A community doing good</h3>
            <p>
              UniMarket is a place where students come together to create, sell, and buy unique items. We're also pushing for positive change for small businesses, people, and the planet.
            </p>
          </div>
          <div className="feature">
            <h3>Support independent creators</h3>
            <p>
              UniMarket supports students who are selling what they love. We make it easy for you to connect directly with makers and find extraordinary products.
            </p>
          </div>
          <div className="feature">
            <h3>Peace of mind</h3>
            <p>
              Your privacy is our highest priority. If you need assistance, our dedicated team is always ready to help.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-content">
          <h2>Shop our popular gift categories</h2>
          <div className="categories">
            <div className="category">
              <img src="/images/anniversary-gifts.jpg" alt="Anniversary gifts" />
              <p>Anniversary gifts</p>
            </div>
            <div className="category">
              <img src="/images/gifts-for-him.jpg" alt="Gifts for him" />
              <p>Gifts for him</p>
            </div>
            <div className="category">
              <img src="/images/gifts-for-her.jpg" alt="Gifts for her" />
              <p>Gifts for her</p>
            </div>
            <div className="category">
              <img src="/images/personalized-gifts.jpg" alt="Personalized gift ideas" />
              <p>Mothers/Fathers Day gifts</p>
            </div>
            <div className="category">
              <img src="/images/wedding-gifts.jpg" alt="Wedding gifts" />
              <p>Birthday gifts</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="section-content">
          <p>Have a question? <a href="#help-center">Go to Help Center</a></p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
