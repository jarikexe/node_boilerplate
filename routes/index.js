import express from 'express';
import userRouter from './user.js';
import auth from './auth.js';
const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', auth);

export default router;