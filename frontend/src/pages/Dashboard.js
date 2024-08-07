import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [highscore, setHighscore] = useState({});
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchHighscore = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/highscore", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHighscore(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHighscore();
  }, [user.token]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      {error && <p className="error">Error: {error}</p>}
      <div className="dashboard-content">
        <div className="highscore">
          <h2>Best Performance</h2>
          <p>
            <FaTachometerAlt /> Best WPM: {highscore.bestWpm || "N/A"}
          </p>
          <p>
            <FaCheckCircle /> Best Accuracy: {highscore.bestAccuracy || "N/A"}%
          </p>
          <p>
            <FaClock /> Last Test Date:{" "}
            {highscore.bestDate
              ? new Date(highscore.bestDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div className="recent-results">
          <h2>Last 5 Results</h2>
          <ul>
            {highscore.last5Results &&
              highscore.last5Results.map((result, index) => (
                <li key={index}>
                  <p>
                    <FaTachometerAlt /> WPM: {result.wpm}
                  </p>
                  <p>
                    <FaCheckCircle /> Accuracy: {result.accuracy}%
                  </p>
                  <p>
                    <FaClock /> Date:{" "}
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                  <p>
                    <FaClock /> Time:{" "}
                    {new Date(result.date).toLocaleTimeString()}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
