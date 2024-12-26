import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error.types';
import logger from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  logger.error(error.stack);
  
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};