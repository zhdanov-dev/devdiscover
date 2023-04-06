import express from 'express';
import setupRoutes from './setup';
import webhookRoutes from './webhook';
import interprateRoutes from './interprate'

const router = express.Router();

router.use('/setup', setupRoutes);
router.use('/webhook', webhookRoutes);
router.use('/interprate', interprateRoutes);

export default router;
