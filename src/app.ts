import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import movieRoutes from './routes/movie.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);

app.use(errorHandler);

export default app;