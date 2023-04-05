import express from 'express';
import registrationRoute from './rigistration';
import loginRoutes from './login';
import logoutRoute from './logout'

const router = express.Router();

router.use('/registration', registrationRoute);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoute);

export default router;
