import express from 'express';
import sentryRoutes from './sentry/routes';
import authRoutes from './auth/routes';
import authMiddleware from '../api/middleware/auth-middleware';
 
const router = express.Router();

router.use('/sentry', authMiddleware, sentryRoutes);
router.use('/auth', authRoutes);

export default router;
