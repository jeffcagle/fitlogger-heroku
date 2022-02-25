import Exercise from '../models/Exercise.model.js';
import Routine from '../models/Routine.model.js';

export const createRoutine = async (req, res) => {
  const user = req.user;
  const { name, goal } = req.body;

  const routine = {
    creator: user._id,
    name: name,
    goal: goal,
    schedule: [
      { day: 'Sunday', exercises: [] },
      { day: 'Monday', exercises: [] },
      { day: 'Tuesday', exercises: [] },
      { day: 'Wednesday', exercises: [] },
      { day: 'Thursday', exercises: [] },
      { day: 'Friday', exercises: [] },
      { day: 'Saturday', exercises: [] },
    ],
    isActive: false,
  };

  await Routine.create(routine);

  res.status(200).json({
    success: true,
    message: `Routine successfully created.`,
    data: req.body,
  });
};

export const getRoutine = async (req, res) => {
  const routineId = req.params.id;

  const routine = await Routine.findOne({ _id: routineId }).populate(
    'schedule.exercises'
  );

  res.status(200).json({
    success: true,
    message: `Routine successfully retrieved.`,
    data: routine,
  });
};

export const renameRoutine = async (req, res) => {
  const routineId = req.params.id;

  try {
    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res
        .status(404)
        .json({ success: false, error: 'Routine not found' });
    }

    if (routine.name !== req.body.name) routine.name = req.body.name;

    routine.save();
    res.status(200).json({ success: true, data: 'Routine renamed' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteRoutine = async (req, res) => {
  const routineId = req.params.id;

  const routine = await Routine.deleteOne({ _id: routineId });

  res.status(200).json({
    success: true,
    message: `Routine successfully deleted.`,
    data: routine,
  });
};

export const addExerciseToRoutine = async (req, res) => {
  // Get exercise to be added
  const { exerciseId, day } = req.body;
  const exercise = await Exercise.findOne({ _id: exerciseId });

  // Get the routine to add the exercise to
  const { routineId } = req.body;
  const routine = await Routine.findOne({ _id: routineId }).populate(
    'schedule.exercises'
  );

  const thisDaysExercises = routine.schedule[day].exercises;

  // Only add exercise to day if it doesn't already exist
  if (thisDaysExercises.some(item => item._id == exerciseId)) {
    return res.status(400).json({
      success: false,
      message: `Exercise already exists on this day.`,
      data: routine,
    });
  } else {
    await thisDaysExercises.push(exercise);
    await routine.save();
    res.status(200).json({
      success: true,
      message: `Exercise successfully added to routine.`,
      data: routine,
    });
  }
};

export const removeExerciseFromRoutine = async (req, res) => {
  // Get the routine to remove an exercise from
  const { routineId } = req.body;
  const routine = await Routine.findOne({ _id: routineId });

  // Get exercise to be removed
  const { exerciseId, day } = req.body;
  const exercise = await Exercise.findOne({ _id: exerciseId });

  await routine.schedule[day - 1].exercises.remove(exerciseId);

  await routine.save();

  res.status(200).json({
    success: true,
    message: `Exercise successfully removed from routine.`,
    data: routine,
  });
};
