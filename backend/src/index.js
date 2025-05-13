import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js'
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoutes.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    // Middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
      origin: 'https://orbit-chat.netlify.app', // Remove trailing slash
      credentials: true,
    }));
  
    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);
  
    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });