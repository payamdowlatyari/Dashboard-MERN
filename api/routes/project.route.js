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
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/owner/:id', getProjectByOwner);
router.post('/create', verifyToken, createProject)
router.put('/comment/:id', verifyToken, addComment);

export default router;