import express from "express"; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
// import CustomError from './utils/customError.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config(); // Load environment variables from .env file

 const app = express();
 const PORT = process.env.PORT;

 // Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use(errorHandler);

//Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes)

// Logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
  });

//MongoDb connection
mongoose.connect(process.env.DB_URL,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     })
     .then(() => console.log("Connected to MongoDB"))
     .catch(err => console.log("'Error connecting to MongoDB", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});