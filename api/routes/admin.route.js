import express from 'express';
import {
  getClient,
  getClients,
  createClient,
  updateClientByAdmin,
  deleteClientByAdmin,
  updateProject,
  deleteProject,
  verifyAdminAccess,
  createAdminAccess,
  updateAdminAccess
} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// admin/access
router.get('/access/:id', verifyAdminAccess);
router.post('/access/create', createAdminAccess);
router.post('/access/update/:id', updateAdminAccess);

// admin/client
router.get('/client/:id', getClient);
router.get('/client', getClients);
router.post('/client/create', createClient);
router.post('/client/update/:id', verifyToken, updateClientByAdmin);
router.delete('/client/delete/:id', verifyToken, deleteClientByAdmin);

// admin/project
router.post('/project/update/:id', verifyToken, updateProject);
router.delete('/project/delete/:id', verifyToken, deleteProject);

export default router;