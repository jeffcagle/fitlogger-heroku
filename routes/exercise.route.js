import express from 'express';

const router = express.Router();

import {
  getExercise,
  createExercise,
  updateExerciseProgress,
  renameExercise,
  deleteExercise,
} from '../controllers/exercise.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

router.route('/:id').get(privateRoute, getExercise);
router.route('/create').post(privateRoute, createExercise);
router.route('/update/:id').put(privateRoute, updateExerciseProgress);
router.route('/rename/:id').put(privateRoute, renameExercise);
router.route('/delete/:id').delete(privateRoute, deleteExercise);

export default router;
