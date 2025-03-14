import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
// import authMiddleware from './middlewares/authMiddleware';

dotenv.config(); // Load environment variables

const app: Application = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('dev')); // Request logging

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); // Log the error
    res.status(500).json({ message: 'Something went wrong' });
});

export default app;
