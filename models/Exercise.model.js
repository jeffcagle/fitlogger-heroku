import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },

    setLogs: [
      {
        value: { type: String, required: true },
        date: { type: Date },
      },
    ],
    repLogs: {
      method: { type: String, required: true },
      values: [
        {
          value: { type: String, required: true },
          date: { type: Date },
        },
      ],
    },
    weightLogs: [
      {
        value: { type: String },
        date: { type: Date },
      },
    ],
    restLogs: [
      {
        value: { type: String },
        date: { type: Date },
      },
    ],
  },

  {
    timestamps: true,
    collection: 'exercises',
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
