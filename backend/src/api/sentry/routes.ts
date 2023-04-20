import express from 'express';
import setupRoutes from './setup';
import webhookRoutes from './webhook';
import interprateRoutes from './interprate'
import authMiddleware from '../../api/middleware/auth-middleware';

const router = express.Router();

router.use('/setup', setupRoutes);
router.use('/webhook', webhookRoutes);
router.use('/interprate', authMiddleware, interprateRoutes);

export default router;
