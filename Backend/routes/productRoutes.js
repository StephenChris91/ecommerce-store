import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/ProductControllers.js'




//@desc     Fetch all products
//@route    GET /api/v1/products
//@access   Public


router.route('/',).get(getProducts);

//@desc     Fetch single product
//@route    GET /api/v1/products/:id
//@access   Public

router.route('/:id',).get(getProductById);


export default router;