import express from 'express'
const router = express.Router();

import signin from '../controllers/auth/signin.js';
import signup from '../controllers/auth/signup.js';
import profile from '../controllers/auth/profile.js';

import auth from '../middleware/auth.js';
import verifyAccount from '../controllers/auth/verifyAccount.js';
import ForgetPassword from '../controllers/auth/ForgetPassword.js';
import ResetPassword from '../controllers/auth/ResetPassowrd.js';

//routes
router.get('/profile', auth(), profile);
router.post('/signin', signin);
router.post('/signup', signup);

router.patch('/verify/:email', verifyAccount);
router.post('/forget-password', ForgetPassword);
router.patch('/reset-password', ResetPassword);

export default router;