import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import clientRoutes from './routes/client.route.js';
import projectRoutes from './routes/project.route.js'
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Dashboard MERN',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from MongoDB.',
    contact: {
      name: 'Dashboard MERN',
      url: 'https://payamd-dashboard.vercel.app',
    },
  },
  servers: [
    {
      url: 'https://dashboard-mern-sandy.vercel.app',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
    origin: ["http://localhost:3000", "https://payamd-dashboard.vercel.app"],
    methods: ["POST", "GET", "PUT","DELETE"]
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
  });
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/client', clientRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

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