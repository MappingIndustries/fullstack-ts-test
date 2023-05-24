import express from 'express';
import * as authController from './auth.controller';

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
// router.post('/token', authController.refreshToken);
// router.delete('/logout', authController.logout);

export default router;
