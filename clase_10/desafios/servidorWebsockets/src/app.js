import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { logger } from "./utils/logger.js";
import { Server } from "socket.io";
import handlebars  from "express-handlebars";
import { __dirname } from "./dirname.js";
import viewsRouter from "./routes/views.routes.js";

import {ProductManager} from "./ProductManager.js";
import {CartManager} from "./CartManager.js";

import { readFileSync, existsSync } from 'fs';


const app = express();
const manager = new ProductManager("./src/Productos.json");
const managerCart = new CartManager("./src/Carrito.json");

const PORT= process.env.PORT || 8080; // Usar el puerto definido en las variables de entorno o 8080 por defecto

// ahora pongo para q escuche en puerto 8080
const httpServer = app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

const io = new Server(httpServer);

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

// Handlebars config
// elijo el tipo de motor a utilizar
app.engine("hbs", handlebars.engine({
  extname: "hbs",
  defaultLayout: "main",
}));

// configuro las vistas
app.set("view engine","hbs");
app.set("views", `${__dirname}/views`);

// Public
app.use(express.static(`${__dirname}/public`));

app.use(logger);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("product_send", async (product) =>{

    console.log(product);

    try { 
      await manager.addProduct(product);
      socket.emit("products", manager.getProducts());
    } catch (error) {
      // socket.emit("message", error);  //falta capturarlo con sweetAlert desde el cliente
      console.log(error.message);
    };
  })

  socket.on("deleteProduct", async (product) => {
    console.log(product);

    await manager.deleteProductById(product.id);

    const updatedProducts = await manager.getProducts();
    io.emit("products", updatedProducts);

  });

  
  // producs es el evento q debo escuchar desde el cliente
  socket.emit("products", manager.getProducts());
});





