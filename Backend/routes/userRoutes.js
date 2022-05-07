import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userControllers.js'




//@desc     Fetch all products
//@route    GET /api/v1/products
//@access   Public


router.post('/login', authUser)

export default router;