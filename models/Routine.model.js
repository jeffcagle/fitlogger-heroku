import mongoose from 'mongoose';

export const routineSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    goal: { type: String },
    schedule: [
      {
        day: { type: String },
        exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
      },
    ],
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'routines',
  }
);

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;
