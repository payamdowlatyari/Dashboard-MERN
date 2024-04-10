import express from 'express';
import {
  getProjectById,
  getProjectByOwner,
  getProjects,
  createProject,
  addComment
} from '../controllers/project.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// api/project
/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Retrieve a list of projects.
 *     description: Retrieve a list of projects from Mongo Database.
 */
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/owner/:id', getProjectByOwner);
router.post('/create', createProject)
router.put('/comment/:id', verifyToken, addComment);

export default router;