const Result = require('../models/Result');

const addResult = async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;
    const result = new Result({
      user: req.user._id,
      wpm,
      accuracy,
    });

    const createdResult = await result.save();
    res.status(201).json(createdResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addResult, getResults };
