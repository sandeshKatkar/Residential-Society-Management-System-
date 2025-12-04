import express from 'express';
import { createComplaint, getAllComplaints, getMyComplaints, updateComplaintStatus, getComplaintStats } from '../controllers/complaintController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/roleCheck.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createComplaint);
router.get('/my', getMyComplaints);
router.get('/stats', adminOnly, getComplaintStats);
router.get('/', getAllComplaints);
router.put('/:id', adminOnly, updateComplaintStatus);

export default router;