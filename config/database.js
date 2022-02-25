import mongoose from 'mongoose';

export default function connectToDatabase() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  };

  try {
    mongoose.connect(process.env.DB_URI, connectionParams);

    mongoose.connection.once('open', () => {
      console.log(`Connected to database successfully.`);
    });
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
  }
}
