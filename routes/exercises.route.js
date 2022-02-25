import express from 'express';

const router = express.Router();

import { getExercises } from '../controllers/exercises.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

router.route('/').get(privateRoute, getExercises);

export default router;
