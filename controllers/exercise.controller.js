import Exercise from '../models/Exercise.model.js';
import {
  validateExercise,
  validateExerciseProgress,
} from '../utils/validation.js';

export const createExercise = async (req, res) => {
  const { _id } = req.user;
  const { name, sets, reps, weight, rest } = req.body;

  // Validate field values with Joi
  const validation = validateExercise(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ success: false, error: validation.error.details[0].message });
  }

  try {
    await Exercise.create({
      creator: _id,
      name,
      setLogs: [{ value: sets, date: Date.now() }],
      repLogs: {
        method: reps.method,
        values: [{ value: reps.value, date: Date.now() }],
      },
      weightLogs: [{ value: weight, date: Date.now() }],
      restLogs: [{ value: rest, date: Date.now() }],
    });
    res.status(201).json({ success: true, data: 'New exercise created' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findOne({ _id: exerciseId }).populate(
      'creator'
    );

    if (!exercise) {
      return res
        .status(401)
        .json({ success: false, error: 'Exercise not found' });
    }

    res.status(200).json({ success: true, data: exercise });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const updateExerciseProgress = async (req, res) => {
  const exerciseId = req.params.id;

  // Validate field values with Joi
  const validation = validateExerciseProgress(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ success: false, error: validation.error.details[0].message });
  }

  try {
    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res
        .status(404)
        .json({ success: false, error: 'Exercise not found' });
    }

    const { setLogs, repLogs, weightLogs, restLogs } = exercise;

    // Store values from the last exercise save
    const setsValue = setLogs[setLogs.length - 1].value,
      prevRepsValue = repLogs.values[repLogs.values.length - 1].value,
      prevWeightValue = weightLogs[weightLogs.length - 1].value,
      prevRestValue = restLogs[restLogs.length - 1].value;

    const newSetsValue = req.body.sets,
      newRepsValue = req.body.reps.value,
      newWeightValue = req.body.weight,
      newRestValue = req.body.rest;

    // Update sets if changed
    if (setsValue != newSetsValue)
      setLogs.push({ value: newSetsValue, date: Date.now() });

    // Update reps value if changed
    if (prevRepsValue != newRepsValue)
      repLogs.values.push({ value: newRepsValue, date: Date.now() });

    // Update weight if changed
    if (prevWeightValue != newWeightValue)
      weightLogs.push({ value: newWeightValue, date: Date.now() });

    // Update rest duration if changed
    if (prevRestValue != newRestValue)
      restLogs.push({ value: newRestValue, date: Date.now() });

    exercise.save();
    res.status(200).json({ success: true, data: 'Exercise updated' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const renameExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res
        .status(404)
        .json({ success: false, error: 'Exercise not found' });
    }

    if (exercise.name !== req.body.name) exercise.name = req.body.name;

    exercise.save();
    res.status(200).json({ success: true, data: 'Exercise renamed' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    await Exercise.deleteOne({ _id: exerciseId });

    res
      .status(200)
      .json({ success: true, data: `Exercise ${exerciseId} deleted` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
