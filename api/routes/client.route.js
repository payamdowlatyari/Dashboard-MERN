import express from 'express';
import {
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

// api/client
router.post('/update/:id', updateClient);
router.delete('/delete/:id', verifyToken, deleteClient);

export default router;