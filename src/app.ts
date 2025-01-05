import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/authRoutes';
import missionsRouter from './routes/missionsRoutes';
import actionsRouter from './routes/actionsRoutes';
// import dbMiddleware from './middlewares/dbMiddleware';
import errorController from './controllers/errorController';
// import authMiddleware from './middlewares/authMiddleware';


const app: Application = express();

app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('dev')); // Request logging
// app.use(dbMiddleware); // Apply the dbMiddleware globally

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/users', authRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/actions', actionsRouter);

// Error Handling Middleware (must come after routes)
// pass errors to the global error controller
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorController(err, req, res, next);
});

export default app;
