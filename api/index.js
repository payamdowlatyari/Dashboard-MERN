import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import clientRoutes from './routes/client.route.js';
import projectRoutes from './routes/project.route.js'
import clientAuthRoutes from './routes/clientAuth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
dotenv.config();

const port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();
app.use(cors({
    origin: ["https://dashboard-mern-sandy.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
  });
})

app.use('/api/user', userRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/client/auth', clientAuthRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Export the Express API
export default app;