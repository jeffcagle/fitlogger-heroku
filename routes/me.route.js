import express from 'express';

const router = express.Router();

import { privateRoute } from '../middleware/auth.middleware.js';
import { getMe } from '../controllers/me.controller.js';

router.route('/').get(privateRoute, getMe);

export default router;
