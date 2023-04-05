import express from 'express';
import setupRoutes from './setup';
import webhookRoutes from './webhook';
import issuesRoutes from './issues'
import eventsRoutes from './events'

const router = express.Router();

router.use('/setup', setupRoutes);
router.use('/webhook', webhookRoutes);
router.use('/issues', issuesRoutes);
router.use('/events', eventsRoutes);

export default router;
