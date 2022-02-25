import express from 'express';

const router = express.Router();

import { getRoutines } from '../controllers/routines.controller.js';
import { privateRoute } from '../middleware/auth.middleware.js';

router.route('/').get(privateRoute, getRoutines);

export default router;
