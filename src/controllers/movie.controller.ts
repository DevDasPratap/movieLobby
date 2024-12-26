import { Request, Response, NextFunction } from 'express';
import { MovieService } from '../services/movie.service';
import { AppError } from '../types/error.types';

const movieService = new MovieService();

export class MovieController {
  async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await movieService.getAllMovies();
      res.json({ status: 'success', data: movies });
    } catch (error) {
      next(error);
    }
  }

  async searchMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await movieService.searchMovies({ q: req.query.q as string });
      res.json({ status: 'success', data: movies });
    } catch (error) {
      next(error);
    }
  }

  async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await movieService.createMovie(req.body);
      res.status(201).json({ status: 'success', data: movie });
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await movieService.updateMovie(req.params.id, req.body);
      res.json({ status: 'success', data: movie });
    } catch (error) {
      next(error);
    }
  }

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      await movieService.deleteMovie(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}