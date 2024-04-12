import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();


mongoose.connect(process.env.MONGO).then(
    () => {
        console.log('mongoDb is connected');
    }
)
.catch((err) => {
    console.log(err);
});


const app = express();

app.listen(6000, () => {
    console.log("Server is running on port 6000");
    console.log("working");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

app.use((err, req, res, next) => {
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal Server Error';
res.status(statusCode).json({
    success:false,
    statusCode,
    message,
})
})
