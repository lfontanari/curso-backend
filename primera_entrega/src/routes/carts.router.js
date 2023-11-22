import { Router } from "express";
import {CartManager , Cart} from "../CartManager.js";
import { readFileSync, existsSync } from 'fs';

const router = Router();
const manager = new CartManager("./src/Carrito.json");

router.post("/", async (req, res) => {
  
  const carrito = new Cart (manager.nextId, []);
  manager.addCart(carrito);
})

// agrega el producto al arreglo products del carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {

    const { cid , pid } = req.params;
    const cart=manager.addCartProd(cid,pid);
    res.json({ message: `El Producto  : ${pid} del Carrito : ${cid}  , fue agregado correctamente .` });
  });

  router.get("/:cid", (req, res) => {
    const { cid } = req.params;
    
    try {
    const cart = manager.getCartById(parseInt(cid));
    
    if (!cart) {
        return res.json({ error: `No se encontró el producto con ID: ${cid}` });
      }
    res.json({cart});
    } catch (error) {
      res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
    }
  });


export default router;