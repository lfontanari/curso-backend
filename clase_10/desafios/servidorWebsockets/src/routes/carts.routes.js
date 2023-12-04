import { Router } from "express";
import {CartManager , Cart} from "../CartManager.js";
import {ProductManager} from "../ProductManager.js";
import { readFileSync, existsSync } from 'fs';

const router = Router();
const manager = new CartManager("./src/Carrito.json");
const productManager = new ProductManager("./src/Productos.json");

router.post("/", async (req, res) => {
  try{
  const carrito = new Cart (manager.nextId, []);
  await manager.addCart(carrito);
  res.json({ message: `Se agrego el carrito: ${carrito.cid} ` });
  
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
})

// agrega el producto al arreglo products del carrito seleccionado
  router.post("/:cid/product/:pid", async (req, res) => {
  
      const { cid , pid } = req.params;
      try {
         // primero reviso si el id del producto que quiere agregar existe en mi base Productos.json
        if (!productManager.getProductById(parseInt(pid))){
          return res.json({ error: `No se encontró el producto con ID: ${pid} en el archivo Productos.json` });
        }

        await manager.addCartProd(cid,pid)
  
        res.json({ message: `El Producto....: ${pid} del Carrito.....: ${cid}  , fue agregado correctamente .` });
        
      } catch (error) {
        res.status(500).json({ error: ` ${error.message}` });
      }
  });

  router.get("/:cid", (req, res) => {
    const { cid } = req.params;
    try {
    const cart = manager.getCartById(parseInt(cid));
    if (!cart) {
        return res.json({ error: `No se encontró el carrito con ID: ${cid}` });
    }
    res.json({cart});

    } catch (error) {
      res.status(500).json({ error: ` ${error.message}` });
    }
  });


export default router;