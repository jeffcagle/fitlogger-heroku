import express from 'express';

const router = express.Router();

import {
  createRoutine,
  getRoutine,
  renameRoutine,
  deleteRoutine,
  addExerciseToRoutine,
  removeExerciseFromRoutine,
} from '../controllers/routine.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

router.route('/create').post(privateRoute, createRoutine);
router.route('/:id').get(privateRoute, getRoutine);
router.route('/rename/:id').put(privateRoute, renameRoutine);
router.route('/delete/:id').delete(privateRoute, deleteRoutine);
router.route('/exercise/add').post(privateRoute, addExerciseToRoutine);
router
  .route('/exercise/remove')
  .delete(privateRoute, removeExerciseFromRoutine);

export default router;
