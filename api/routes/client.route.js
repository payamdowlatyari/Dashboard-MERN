import express from 'express';
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient,
  updateClientByAdmin,
  deleteClientByAdmin
} from '../controllers/client.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.post('/update/:id', updateClient);
router.post('/admin/update/:id', updateClientByAdmin);
router.delete('/delete/:id', verifyToken, deleteClient);
router.delete('/admin/delete/:id', deleteClientByAdmin);

export default router;