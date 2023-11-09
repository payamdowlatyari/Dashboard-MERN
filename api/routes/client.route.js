import express from 'express';
import {
  getClient,
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient)
router.post('/update/:id', verifyToken, updateClient);
router.delete('/delete/:id', verifyToken, deleteClient);

export default router;