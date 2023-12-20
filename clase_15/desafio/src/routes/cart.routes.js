import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";
import productDao from "../daos/dbManager/product.dao.js";

//import {CartManager , Cart} from "../CartManager.js";
//import {ProductManager} from "../ProductManager.js";
// import { readFileSync, existsSync } from 'fs';

const router = Router();

// const manager = new CartManager("./src/Carrito.json");
// const productManager = new ProductManager("./src/Productos.json");

router.get("/", async (req, res) => {
    try {
        const carts = await cartDao.findCarts();
        res.json({

            data: carts,
            message:"Carts list",
        });

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
    }
});



router.post("/", async (req, res) => {
  try{
  console.log(req.body);
   
  const { product, quantity } = req.body;
 
  const producto = await productDao.getProductById(product);
  
  if (!producto) return res.status(404).json({message: "Product not found"});

  const carrito = await cartDao.createCart({ products: req.body});
  
  res.json({ message: `Se agrego el carrito: ${carrito} ` });
  
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});

router.put("/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const carrito = await cartDao.updateCart(id, req.body);   
    res.json({ message: `Se actualizo el ok el carrito: ${id} ` });

    } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});

router.delete("/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const cart = await cartService.deleteCart(id);
    res.json({ message: `Se borro el carrito: ${id} ` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
    }
});


export default router;