    import express from 'express';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    import userRoutes from './routes/user.route.js';
    import authRoutes from './routes/auth.route.js';
    import postRoutes from './routes/post.route.js';
    import commentRoutes from './routes/comment.route.js'
    import cookieParser from 'cookie-parser';
    
    dotenv.config();

    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connection established');
    }
    )
    .catch((err) => {       
        console.error('MongoDB connection error:', err);
    });

    const app = express();
    // Middleware to parse JSON requests
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/user',userRoutes);
    app.use('/api/auth',authRoutes);
    app.use('/api/post',postRoutes);
    app.use('/api/comment',commentRoutes)
   
    // Error handling middleware
    app.use((err,req,res,next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        res.status(statusCode).json({
            success: false,
            statusCode,
            message
        })
    });

    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });