import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
//import { readFileSync, existsSync } from 'fs';

const router = Router();

// Endpoints 
router.get('/',async (req,res)=>{
  try{
      const { limit,page,query,sort } = req.query
      const productos = await productDao.getAllProducts(limit, page, query, sort);
      
      res.json({
        data: productos,
        message: "Product list",
      });
      
  }
  catch(err){
      res.status(500).json({error:err})
  }
});

router.get('/:pid', async (req,res)=>{
  try{
      
      const{ pid } = req.params
      const producto = productDao.getProductById(pid)
      res.json(producto)

  }
  catch(err){
      res.status(500).json({error:err})
  }
});

router.post('/', async (req,res)=>{
  try{
      let producto = req.body
      const newProduct = await productDao.createProduct(producto)
      res.status(201).json({message: "Producto agregado correctamente"})
  }
  catch(err){
      res.status(500).json({error:err})
  }

});

router.put('/:pid',async (req,res)=>{
  try{
      let productoModificado = req.body
      let modified = await productDao.updateProduct(req.params.pid,productoModificado)
      res.status(201).json(modified)
  }
  catch(err){
      res.status(500).json({error:err})
  }    
});

router.delete('/:pid', async (req,res)=>{
  try{
      let deleted =await productDao.deleteProduct(req.params.pid)
      res.status(201).json(deleted.message)
  }
  catch(err){ res.status(500).json({error:err})}
  
});

export default router;