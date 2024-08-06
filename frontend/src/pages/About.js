import React, { useState, useEffect } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaRocket,
  FaHeart,
  FaAward,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState({
    team: false,
    mission: false,
    contact: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const team = document.querySelector(".team");
      const mission = document.querySelector(".mission");
      const contact = document.querySelector(".contact-us");

      setIsVisible({
        team: isElementInViewport(team),
        mission: isElementInViewport(mission),
        contact: isElementInViewport(contact),
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const scrollToContent = () => {
    const content = document.querySelector(".team");
    content.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about">
      <header className="about-header">
        <h1>About Typing Master</h1>
        <p className="tagline">Empowering You to Type Faster and Smarter</p>
      </header>

      <div className="scroll-indicator" onClick={scrollToContent}>
        <p>Discover Our Story</p>
        <FaChevronDown className="scroll-icon" />
      </div>

      <main className="about-main">
        <section className={`team ${isVisible.team ? "visible" : ""}`}>
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <FaUsers className="team-icon" />
              <h3>Pixel Pirates</h3>
              <p>
                We are a dedicated team of developers and designers, passionate
                about creating engaging and effective typing experiences.
              </p>
            </div>
            <div className="team-member">
              <FaAward className="team-icon" />
              <h3>Awards & Recognition</h3>
              <p>
                Our commitment to excellence has earned us accolades from the
                community and industry leaders.
              </p>
            </div>
          </div>
        </section>

        <section className={`mission ${isVisible.mission ? "visible" : ""}`}>
          <h2>Our Mission and Vision</h2>
          <div className="mission-content">
            <div className="mission-item">
              <FaRocket className="mission-icon" />
              <h3>Mission</h3>
              <p>
                To deliver an innovative and enjoyable typing practice
                experience that helps users enhance their speed and accuracy.
              </p>
            </div>
            <div className="mission-item">
              <FaHeart className="mission-icon" />
              <h3>Vision</h3>
              <p>
                To be the leading platform for typing practice, making it
                accessible and enjoyable for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className={`contact-us ${isVisible.contact ? "visible" : ""}`}>
          <h2>Reach Out to Us</h2>
          <p>
            If you have any questions or feedback, feel free to reach out to us.
          </p>
          <Link to="/contact" className="contact-button">
            <FaEnvelope className="button-icon" />
            Get in Touch
          </Link>
        </section>
      </main>
    </div>
  );
};

export default About;
