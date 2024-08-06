import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBullseye,
  FaChartLine,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <main className="home-main">
        <section className="hero">
          <h1>Master the Art of Typing</h1>
          <p>Improve your speed and accuracy with our interactive typing challenges</p>
          <Link to="/play" className="cta-button">Start Typing <FaArrowRight className="icon-right" /></Link>
        </section>
        <section className="features">
          <h2>Why Choose TypeMaster?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <FaTachometerAlt className="feature-icon" />
              <h3>Boost Your Speed</h3>
              <p>Train to type faster with our adaptive challenges</p>
            </div>
            <div className="feature-item">
              <FaBullseye className="feature-icon" />
              <h3>Improve Accuracy</h3>
              <p>Enhance your precision with real-time feedback</p>
            </div>
            <div className="feature-item">
              <FaChartLine className="feature-icon" />
              <h3>Track Progress</h3>
              <p>Monitor your improvement with detailed statistics</p>
            </div>
            <div className="feature-item">
              <FaTrophy className="feature-icon" />
              <h3>Compete & Achieve</h3>
              <p>Challenge yourself and earn achievements</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-item">
              <p>
                "TypeMaster helped me increase my typing speed by 20 WPM in just
                two weeks!"
              </p>
              - Sarah K.
            </div>
            {/* Add more testimonials as needed */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
