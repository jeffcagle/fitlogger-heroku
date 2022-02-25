import Exercise from '../models/Exercise.model.js';

export const getExercises = async (req, res) => {
  const { _id } = req.user;

  try {
    const exercises = await Exercise.find({ creator: _id });
    res.status(200).json({ success: true, data: exercises });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
