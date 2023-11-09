import express from 'express';
import {
  getProjectById,
  getProjectByOwner,
  getProjects,
  updateProject,
  deleteProject,
  createProject,
} from '../controllers/project.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/owner/:id', getProjectByOwner);
router.post('/', createProject)
router.post('/update/:id', updateProject);
router.delete('/delete/:id', verifyToken, deleteProject);

export default router;