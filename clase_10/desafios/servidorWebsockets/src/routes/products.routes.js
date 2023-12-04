import { Router } from "express";
import {ProductManager} from "../ProductManager.js";
import { readFileSync, existsSync } from 'fs';

const manager = new ProductManager("./src/Productos.json");
const router = Router();


// Endpoints productos con limite de resultados

router.get("/", (req, res) => {
  try {
    const {limit} = req.query;
    const products = manager.getProducts();
    // si no recibe limite devolver todos los productos
    if (!limit || products.length < parseInt(limit)) {
        res.json({ products });
    } else {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json({ limitedProducts });
    }
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
        
});


router.get("/:pid", (req, res) => {
    const {pid} = req.params;
    try {
    const product = manager.getProductById(parseInt(pid));
    if (!product) {
        return res.json({ error: `No se encontró el producto con ID: ${pid}` });
      }
    res.json({product});
    } catch (error) {
      res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
    }
  });


router.post("/", async (req, res) => {

  // revisar como van los parametros
  const { title, description, code, price, stock, category , thumbnails} = req.body;
  /* status es true por defecto, todos los campos obliagorios menos thumbnails (lo valida la clase)*/
  //console.log(title, description, code, price, stock, category,thumbnails);
  try {
  const producto = {
    "title" : title,
    "description" : description,
    "code" : code,
    "price" : parseInt(price),
    "status" : "true",
    "stock" : parseInt(stock),
    "category" : category,
    "thumbnails" : thumbnails
  }
   
 /* usar los metodos de la clase para insertar registros */
  await manager.addProduct(producto);
  res.json({ message: `Producto Titulado: ${title} fue agregado correctamente.` });

  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


router.put("/:pid", async (req, res) => {
  const {pid} = req.params;

  const {title, description,code, price, status,stock,category,thumbnail} = req.body;
  
  const updProduct = {};
  try {
  // En la clase tengo validado los campos obligatorios en update
  // const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
  // Actualizar los campos en updProduct segun lo enviado en el body
  if (title) updProduct.title = title;
  if (description) updProduct.description = description;
  if (code) updProduct.code = code;
  if (price) updProduct.price = price;
  if (status) updProduct.status = status;
  if (stock) updProduct.stock = stock;
  if (category) updProduct.category = category;
  if (thumbnail) updProduct.thumbnail = thumbnail;

  
    await manager.updateProductById(pid, updProduct);
    res.json({ message: `Producto con ID ${pid} actualizado correctamente.` });

  } catch (error) {
  // Si hay un error, responder con un código de estado 500 y un mensaje de error
  res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


router.delete("/:pid", async (req, res) => {
  const {pid} = req.params;
  

  try {
    await manager.deleteProductById(pid);

    res.json({ message: `Producto con ID ${pid} eliminado correctamente.` });
  } catch (error) {
  // Si hay un error, responder con un código de estado 500 y un mensaje de error
  res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
  }
});


export default router;