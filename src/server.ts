import app from './app';
import { config } from './config';
import { connectDB } from './database/mongodb';
import logger from './utils/logger';

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();