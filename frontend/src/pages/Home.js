import React from "react";
import { Link } from "react-router-dom";
import {
  FaKeyboard,
  FaCode,
  FaClock,
  FaQuoteRight,
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
          <p>
            Improve your speed and accuracy with our interactive typing
            challenges
          </p>
          <Link to="/play" className="cta-button">
            Start Typing <FaArrowRight className="icon-right" />
          </Link>
        </section>

        <section className="features">
          <h2>Diverse Typing Challenges</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <FaKeyboard className="feature-icon" />
              <h3>Words Mode</h3>
              <p>
                Practice typing common words to build your vocabulary and speed
              </p>
            </div>
            <div className="feature-item">
              <FaCode className="feature-icon" />
              <h3>Code Mode</h3>
              <p>
                Enhance your coding speed with programming language snippets
              </p>
            </div>
            <div className="feature-item">
              <FaClock className="feature-icon" />
              <h3>Time Mode</h3>
              <p>Race against the clock to improve your typing speed</p>
            </div>
            <div className="feature-item">
              <FaQuoteRight className="feature-icon" />
              <h3>Quote Mode</h3>
              <p>Type famous quotes to enhance your accuracy and speed</p>
            </div>
          </div>
        </section>

        <section className="additional-features">
          <h2>Why Choose TypeMaster?</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <FaChartLine className="feature-icon" />
              <h3>Track Progress</h3>
              <p>Monitor your improvement with detailed statistics</p>
            </div>
            <div className="feature-item">
              <FaTrophy className="feature-icon" />
              <h3>Leaderboards</h3>
              <p>Compete with others and see where you rank</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial-carousel">
            <div className="testimonial-item">
              <p>
                "TypeMaster's diverse challenges helped me improve my typing in
                both English and code. It's a game-changer!"
              </p>
              - Alex M., Software Developer, USA
            </div>
            <div className="testimonial-item">
              <p>
                "The leaderboard feature keeps me motivated. I've seen my speed
                increase from 50 to 80 WPM in just a month!"
              </p>
              - Sarah K., Student, Canada
            </div>
            <div className="testimonial-item">
              <p>
                "As an Indian student preparing for competitive exams,
                TypeMaster has significantly improved my typing speed and
                accuracy."
              </p>
              - Rahul P., Engineering Student, India
            </div>
            <div className="testimonial-item">
              <p>
                "The Code Mode is fantastic! It's helped me become much more
                efficient in my programming tasks."
              </p>
              - Emma L., Full Stack Developer, UK
            </div>
            <div className="testimonial-item">
              <p>
                "I love the Quote Mode. It's not only improving my typing but
                also introducing me to inspiring words!"
              </p>
              - Priya S., Content Writer, India
            </div>
            <div className="testimonial-item">
              <p>
                "TypeMaster has been instrumental in helping me prepare for my
                UPSC exam. Highly recommended for all Indian students!"
              </p>
              - Amit K., UPSC Aspirant, India
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
