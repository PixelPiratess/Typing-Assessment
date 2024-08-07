const Result = require('../models/Result');
const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    const results = await Result.aggregate([
      { $sort: { wpm: -1 } },
      { $group: {
        _id: { gameMode: "$gameMode", difficulty: "$difficulty" },
        bestWpm: { $first: "$wpm" },
        bestAccuracy: { $first: "$accuracy" },
        bestDate: { $first: "$date" },
        users: { $push: { user: "$user", wpm: "$wpm", accuracy: "$accuracy", date: "$date" } }
      }},
      { $unwind: "$users" },
      { $lookup: {
        from: "users",
        localField: "users.user",
        foreignField: "_id",
        as: "userDetails"
      }},
      { $unwind: "$userDetails" },
      { $group: {
        _id: "$_id",
        bestWpm: { $first: "$bestWpm" },
        bestAccuracy: { $first: "$bestAccuracy" },
        bestDate: { $first: "$bestDate" },
        users: { $push: { user: "$users.user", username: "$userDetails.username", wpm: "$users.wpm", accuracy: "$users.accuracy", date: "$users.date" } }
      }},
      { $project: {
        gameMode: "$_id.gameMode",
        difficulty: "$_id.difficulty",
        bestWpm: 1,
        bestAccuracy: 1,
        bestDate: 1,
        users: { $slice: ["$users", 10] } // Top 10 users
      }}
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard };
