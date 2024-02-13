import express from 'express';
// importo un controller
import { getProductsControllers, getIdProductsControllers,  postProductsControllers, putProductsControllers, deleteProductsControllers } 
    from '../controllers/products.Controller.js'


const router = express.Router();

// get
router.get('/', getProductsControllers);

router.get('/', getIdProductsControllers);

// post
router.post('/', postProductsControllers);

// put
router.put('/', putProductsControllers);

// delete
router.delete('/', deleteProductsControllers);

export default router;