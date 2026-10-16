import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import khataRoutes from './routes/khata.routes';
import diagnosisRoutes from './routes/diagnosis.routes';
import soilRoutes from './routes/soil.routes';
import transportRoutes from './routes/transport.routes';
import marketRoutes from './routes/market.routes';
import schemeRoutes from './routes/scheme.routes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    service: 'Krishimitara / KisanSetu Backend API',
    version: '0.1.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/khata', khataRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/market', marketRoutes);
app.use('/api', schemeRoutes);

// 404 Handler
app.use((_req: Request, res: Response) => {
  return res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error caught]:', err);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err?.message || 'Unexpected server error occurred',
  });
});

export default app;
