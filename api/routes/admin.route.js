import express from 'express';
import {
  getClient,
  getClients,
  createClient,
  updateClientByAdmin,
  deleteClientByAdmin,
  updateProject,
  deleteProject
} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// admin/client
router.get('/client/:id', getClient);
router.get('/client', getClients);
router.post('/client/create', createClient);
router.post('/client/update/:id', updateClientByAdmin);
router.delete('/client/delete/:id', deleteClientByAdmin);

// admin/project
router.post('/project/update/:id', updateProject);
router.delete('/project/delete/:id', deleteProject);

export default router;