const Result = require('../models/Result');

const addResult = async (req, res) => {
  const { wpm, accuracy } = req.body;
  const result = new Result({
    user: req.user._id,
    wpm,
    accuracy,
  });

  const createdResult = await result.save();
  res.status(201).json(createdResult);
};

const getResults = async (req, res) => {
  const results = await Result.find({ user: req.user._id });
  res.json(results);
};

module.exports = { addResult, getResults };
