import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

connectDb();

import authRouter from './routes/auth.route.js';
import meRouter from './routes/me.route.js';
import exerciseRouter from './routes/exercise.route.js';
import exercisesRouter from './routes/exercises.route.js';
import routineRouter from './routes/routine.route.js';
import routinesRouter from './routes/routines.route.js';
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/me', meRouter);
app.use('/api/v1/exercise', exerciseRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/routine', routineRouter);
app.use('/api/v1/routines', routinesRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
