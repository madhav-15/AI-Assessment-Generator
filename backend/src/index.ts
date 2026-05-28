import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { env } from './config/env';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { initWebSocketServer } from './websocket/wsServer';

// Routes
import assignmentsRouter from './routes/assignments';
import resultsRouter from './routes/results';

// Workers
import './workers/generationWorker';

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/assignments', assignmentsRouter);
app.use('/api/results', resultsRouter);

// Global Error Handler
app.use(errorHandler);

// WebSocket
initWebSocketServer(httpServer);

// Bootstrap Server
const startServer = async () => {
  await connectDB();
  
  httpServer.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
};

startServer();
