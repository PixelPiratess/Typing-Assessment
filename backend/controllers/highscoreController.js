const Result = require('../models/Result');

const getHighscores = async (req, res) => {
  try {
    const results = await Result.aggregate([
      { $match: { user: req.user._id } },
      { $sort: { wpm: -1 } },
      { $group: {
        _id: "$user",
        bestWpm: { $first: "$wpm" },
        bestAccuracy: { $first: "$accuracy" },
        bestDate: { $first: "$date" },
        last5Results: { $push: { wpm: "$wpm", accuracy: "$accuracy", date: "$date" } }
      }},
      { $project: {
        bestWpm: 1,
        bestAccuracy: 1,
        bestDate: 1,
        last5Results: { $slice: ["$last5Results", -5] }
      }}
    ]);
    res.json(results[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHighscores };
