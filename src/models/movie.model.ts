import mongoose, { Schema } from 'mongoose';
import { IMovie } from '../types/movie.types';

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true, index: true },
  genre: { type: [String], required: true, index: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  streamingLink: { type: String, required: true }
}, {
  timestamps: true
});

movieSchema.index({ title: 'text', genre: 'text' });

export const Movie = mongoose.model<IMovie>('Movie', movieSchema);