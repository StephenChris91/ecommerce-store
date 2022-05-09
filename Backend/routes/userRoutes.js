import express from 'express';
const router = express.Router();
import { authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile 
} from '../controllers/userControllers.js'
import { protect } from '../data/middleware/authMiddleware.js';




router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router;