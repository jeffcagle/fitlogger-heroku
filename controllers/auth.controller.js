import User from '../models/User.model.js';
import Exercise from '../models/Exercise.model.js';
import bcrypt from 'bcryptjs';
import { validateRegister, validateLogin } from '../utils/validation.js';

/**
 * @desc Register new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate field values with Joi
  const validation = validateRegister(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ success: false, error: validation.error.details[0].message });
  }

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  try {
    // Create new user
    const newUser = await User.create({ name, email, password });
    await Exercise.create({
      creator: newUser._id,
      name: 'Sample Exercise (click me)',

      setLogs: [
        { value: 3, date: Date.now() - 148 * day },
        { value: 4, date: Date.now() - 18 * day },
      ],
      repLogs: {
        method: 'Reps',
        values: [
          { value: 8, date: Date.now() - 148 * day },
          { value: 9, date: Date.now() - 117 * day },
          { value: 10, date: Date.now() - 72 * day },
          { value: 9, date: Date.now() - 61 * day },
          { value: 10, date: Date.now() - 28 * day },
        ],
      },
      weightLogs: [
        { value: 30, date: Date.now() - 148 * day },
        { value: 35, date: Date.now() - 132 * day },
        { value: 30, date: Date.now() - 107 * day },
        { value: 35, date: Date.now() - 94 * day },
        { value: 40, date: Date.now() - 21 * day },
        { value: 45, date: Date.now() },
      ],
      restLogs: [
        { value: 120, date: Date.now() - 148 * day },
        { value: 100, date: Date.now() - 64 * day },
        { value: 90, date: Date.now() - 5 * day },
      ],
    });
    res.status(201).json({ success: true, data: 'New user created' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * @desc Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate field values with Joi
  const validation = validateLogin(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ success: false, error: validation.error.details[0].message });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: 'Invalid credentials' });
    }

    // Verify passwords match
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    } else {
      // Sign and return token
      const token = user.getSignedToken();
      res.status(200).json({ success: true, data: token });
    }
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};
