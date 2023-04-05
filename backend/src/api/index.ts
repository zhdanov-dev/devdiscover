import express from 'express';
import sentryRoutes from './sentry/routes';
import authRoutes from './auth/routes';
 
const router = express.Router();

router.use('/sentry', sentryRoutes);
router.use('/auth', authRoutes);

export default router;
