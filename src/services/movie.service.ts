import { IMovie, MovieQuery } from '../types/movie.types';
import { Movie } from '../models/movie.model';
import { AppError } from '../types/error.types';
import { getCached, setCache, deleteCache } from '../utils/cache';

export class MovieService {
  async getAllMovies(): Promise<IMovie[]> {
    const cachedMovies = getCached<IMovie[]>('all_movies');
    if (cachedMovies) return cachedMovies;

    const movies = await Movie.find().sort({ createdAt: -1 });
    setCache('all_movies', movies);
    return movies;
  }

  async searchMovies(query: MovieQuery): Promise<IMovie[]> {
    const cacheKey = `search_${query.q}`;
    const cachedResults = getCached<IMovie[]>(cacheKey);
    if (cachedResults) return cachedResults;

    const searchQuery = query.q ? {
      $or: [
        { title: new RegExp(query.q, 'i') },
        { genre: new RegExp(query.q, 'i') }
      ]
    } : {};

    const movies = await Movie.find(searchQuery);
    setCache(cacheKey, movies);
    return movies;
  }

  async createMovie(movieData: IMovie): Promise<IMovie> {
    const movie = await Movie.create(movieData);
    deleteCache('all_movies');
    return movie;
  }

  async updateMovie(id: string, movieData: Partial<IMovie>): Promise<IMovie> {
    const movie = await Movie.findByIdAndUpdate(
      id,
      { $set: movieData },
      { new: true, runValidators: true }
    );

    if (!movie) {
      throw new AppError(404, 'Movie not found');
    }

    deleteCache('all_movies');
    return movie;
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await Movie.findByIdAndDelete(id);
    
    if (!movie) {
      throw new AppError(404, 'Movie not found');
    }

    deleteCache('all_movies');
  }
}