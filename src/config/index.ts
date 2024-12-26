import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/movie-lobby',
  environment: process.env.NODE_ENV || 'development',
  cacheTimeout: 300 // 5 minutes
};