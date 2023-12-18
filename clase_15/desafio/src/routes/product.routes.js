import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
//import { readFileSync, existsSync } from 'fs';

const router = Router();

// Endpoints 

router.get("/", async (req, res) => {
  try {
     
    const products = await productDao.getAllProducts();

    res.json({
        data: products,
        message: "Product list",
    });
    
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
        
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productDao.getProductById(id);
    if (!product) return res.json({ status: 404, message: "Product not found"});
    res.json({
        product,
        message: "Product found",
    });
    
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
        
});


router.post("/", async (req, res) => {

try {
    console.log(req.body);
    const product = await productDao.createProduct(req.body);
  
    res.json({
        product,
        message: "Producto creado",
    });
 

  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productDao.updateProduct(id, req.body);
  
        res.json({
            product,
            message: "Producto actualizado",
        });
   

  } catch (error) {
  // Si hay un error, responder con un código de estado 500 y un mensaje de error
  res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productDao.deleteProduct(id);
        res.json({
            product,
            message: "Producto eliminado",
        });
   
  } catch (error) {
  // Si hay un error, responder con un código de estado 500 y un mensaje de error
  res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


export default router;