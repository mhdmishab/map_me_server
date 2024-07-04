import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Url=process.env.MONGO_URL;

const dbConnection = () => {
  mongoose.connect(Url);

  const connection = mongoose.connection;

  connection.on('connected', () => {
    console.log('Database connected successfully');
  });

  connection.on('error', (error) => {
    console.error('Database connection error:', error);
  });
};

export default dbConnection;