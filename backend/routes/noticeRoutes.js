import express from 'express';
import { createNotice, getAllNotices, getActiveNotices, updateNotice, deleteNotice } from '../controllers/noticeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/roleCheck.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/active', getActiveNotices);
router.get('/', getAllNotices);

router.use(adminOnly);
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

export default router;