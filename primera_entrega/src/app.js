import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import {ProductManager} from "./ProductManager.js";
import {CartManager} from "./CartManager.js";

import { readFileSync, existsSync } from 'fs';


const app = express();
const manager = new ProductManager("./src/Productos.json");
const managerCart = new CartManager("./src/Carrito.json");

const PORT= process.env.PORT || 8080; // Usar el puerto definido en las variables de entorno o 8080 por defecto
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sugerencias tutor Amadeo
//Verificar la existencia de al menos 10 productos en Productos.json

const productosData = readFileSync('./src/Productos.json', 'utf-8');
const productos = JSON.parse(productosData);
if (productos.length < 10) {
  console.error('¡Atención! El archivo Productos.json no contiene al menos 10 productos.');
  process.exit(1); // Salir con código de error
}


// ahora pongo para q escuche en puerto 8080
const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);







