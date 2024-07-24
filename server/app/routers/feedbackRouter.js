import express from 'express'
const router = express.Router();

import auth from '../middleware/auth.js';
import CreateFeedback from '../controllers/feedback/CreateFeedback.js';

//routes
router.post('/', auth(), CreateFeedback);

export default router;