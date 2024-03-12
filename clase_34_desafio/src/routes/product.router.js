import express from 'express';
// importo un controller
import { getProductsControllers, getIdProductsControllers,  postProductsControllers, putProductsControllers, deleteProductsControllers } 
    from '../controllers/products.Controller.js'
    

const router = express.Router();

// **BASE
router.get("/loggerTest", (req, res) => {
  
    req.logger.warning("Prueba de log level info --> en Endpoint"); // **CUSTOM
    res.send("Prueba de logger!");
    
  });

// get
router.get('/', getProductsControllers);

router.get('/:pid', getIdProductsControllers);

// post
router.post('/', postProductsControllers);

// put
router.put('/:pid', putProductsControllers);

// delete
router.delete('/:pid', deleteProductsControllers);



export default router;