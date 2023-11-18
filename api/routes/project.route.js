import express from 'express';
import {
  getProjectById,
  getProjectByOwner,
  getProjects,
  updateProject,
  deleteProject,
  createProject,
  addComment
} from '../controllers/project.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/owner/:id', getProjectByOwner);
router.post('/', verifyToken, createProject)
router.post('/update/:id', verifyToken, updateProject);
router.delete('/delete/:id', verifyToken, deleteProject);
router.put('/comment/:id', verifyToken, addComment);

export default router;