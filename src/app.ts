import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import express, { Application,Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import dbMiddleware from './middlewares/dbMiddleware';
import errorController from './controllers/errorController';
// import authMiddleware from './middlewares/authMiddleware';


const app: Application = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('dev')); // Request logging
// app.use(dbMiddleware); // Apply the dbMiddleware globally

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Public directory for static files (optional)
app.use(express.static('public'));

// Routes
app.use('/api/v1/users', userRoutes);

// Protect certain routes with authentication
// app.use('/api/protected', authMiddleware, (req, res) => {
//     res.send('Protected route');
// });

// Error Handling Middleware (must come after routes)
// pass errors to the global error controller
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorController(err, req, res, next);
});

export default app;
