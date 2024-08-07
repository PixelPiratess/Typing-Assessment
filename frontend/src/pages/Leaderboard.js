import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameMode, setGameMode] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loggedIn, setLoggedIn] = useState(true); // Add this state
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        if (response.status === 401) { // Unauthorized
          setLoggedIn(false); // Set loggedIn to false
          return;
        }
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      setLeaderboard(data);
      setLoggedIn(true); // Set loggedIn to true
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoggedIn(false); // Set loggedIn to false on error
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const processLeaderboard = (data, selectedGameMode, selectedDifficulty) => {
    const gameModes = selectedGameMode ? [selectedGameMode] : ['time', 'code', 'words', 'quote'];
    let processedData = [];

    gameModes.forEach(mode => {
      const modeData = data.filter(item => 
        item.gameMode === mode && 
        (!selectedDifficulty || item.difficulty === selectedDifficulty)
      );

      if (modeData.length > 0) {
        const uniqueUsers = new Map();
        modeData.forEach(item => {
          item.users.forEach(user => {
            if (!uniqueUsers.has(user.username) || user.wpm > uniqueUsers.get(user.username).wpm) {
              uniqueUsers.set(user.username, { 
                ...user, 
                bestWpm: item.bestWpm, 
                bestAccuracy: item.bestAccuracy, 
                bestDate: item.bestDate 
              });
            }
          });
        });

        const sortedUsers = Array.from(uniqueUsers.values()).sort((a, b) => b.wpm - a.wpm);
        const topUsers = sortedUsers.slice(0, selectedGameMode ? 10 : 3);

        processedData.push({
          gameMode: mode,
          difficulty: modeData[0].difficulty,
          users: topUsers,
        });
      }
    });

    return processedData;
  };

  const filteredLeaderboard = processLeaderboard(leaderboard, gameMode, difficulty);

  return (
    <div className="leaderboard">
      {!loggedIn ? (
        <div className="login-message">
          <p>You need to log in to view the leaderboard.</p>
          <button onClick={() => navigate('/login')}>Login Now</button>
        </div>
      ) : (
        <>
          <div className="leaderboard-header">
            <h1>Leaderboard</h1>
            <p className="tagline">Top {gameMode ? '10' : '3'} players {gameMode ? `in ${gameMode} mode` : 'in each game mode'}</p>
          </div>
          <div className="leaderboard-content">
            <div className="filter-options">
              <label>
                Game Mode:
                <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
                  <option value=''>All</option>
                  <option value='time'>Time</option>
                  <option value='code'>Code</option>
                  <option value='words'>Words</option>
                  <option value='quote'>Quote</option>
                </select>
              </label>
              <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value=''>All</option>
                  <option value='easy'>Easy</option>
                  <option value='medium'>Medium</option>
                  <option value='hard'>Hard</option>
                </select>
              </label>
            </div>
            {filteredLeaderboard.map((modeData, index) => (
              <div key={index}>
                <h2>{modeData.gameMode.charAt(0).toUpperCase() + modeData.gameMode.slice(1)} Mode - {modeData.difficulty}</h2>
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Username</th>
                      <th>WPM</th>
                      <th>Accuracy</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modeData.users.map((user, userIndex) => (
                      <tr key={userIndex}>
                        <td>{userIndex + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.wpm}</td>
                        <td>{user.accuracy}%</td>
                        <td>{new Date(user.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Leaderboard;
