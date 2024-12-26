import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller';

const router = Router();
const movieController = new MovieController();

router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

export default router;