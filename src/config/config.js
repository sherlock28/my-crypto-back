import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import homeRoutes from '../routes/home.routes';
import userRoutes from '../routes/users.routes';
import { config } from 'dotenv';
config();

export const configuration = app => {

    // settings
    app.set('port', process.env.PORT || 4000);

    // middlewares
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(cors());

    // routes
    app.use('/users', userRoutes);
    app.use(homeRoutes);
    
    return app;
} 