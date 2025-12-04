import express from 'express';
import { getAllOwners, createOwner, updateOwner, deleteOwner, searchOwners } from '../controllers/ownerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/roleCheck.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/', getAllOwners);
router.get('/search', searchOwners);
router.post('/', createOwner);
router.put('/:id', updateOwner);
router.delete('/:id', deleteOwner);

export default router;