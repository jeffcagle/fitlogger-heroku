import Routine from '../models/Routine.model.js';

export const getRoutines = async (req, res) => {
  const user = req.user;

  const routines = await Routine.find({ creator: user._id }).populate(
    'creator'
  );

  res.status(200).json({ success: true, data: routines });
};
