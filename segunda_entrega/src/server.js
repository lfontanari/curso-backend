import express from "express";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";

//import { logger } from "./utils/logger.js";
import { Server } from "socket.io";

import handlebars  from "express-handlebars";
import { __dirname } from "./dirname.js";

import mongoose from "mongoose";

// esto sirve para recorrer arrays en handlebars
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

//import {ProductManager} from "./ProductManager.js";
//import {CartManager} from "./CartManager.js";
//import { readFileSync, existsSync } from 'fs';

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/eCommerce")
    .then( () => {
        console.log("Connected to MongoDB");
    })
    .catch ((error) => {
        console.log(error);
        console.log("Failed to connect to MongoDB");

    } );

    
//const manager = new ProductManager("./src/Productos.json");
//const managerCart = new CartManager("./src/Carrito.json");

const PORT= process.env.PORT || 8080; // Usar el puerto definido en las variables de entorno o 8080 por defecto

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars config
// elijo el tipo de motor a utilizar
app.engine("hbs", handlebars.engine({
  extname: ".hbs",
  defaultLayout: "main",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

// configuro las vistas
app.set("view engine","hbs");
app.set("views", `${__dirname}/views`);

// Public
app.use(express.static(`${__dirname}/public`));

// app.use(logger);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// ahora pongo para q escuche en puerto 8080
const httpServer = app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
const io = new Server(httpServer);


// socket
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("product_send", async (product) =>{

    try { 
      
      await manager.addProduct(product);
      socket.emit("products", manager.getProducts());
    } catch (error) {
      // socket.emit("message", error);  //falta capturarlo con sweetAlert desde el cliente
      console.log(error.message);
    };
  })

  socket.on("deleteProduct", async (idProduct) => {
    
    await manager.deleteProductById(idProduct);

    const updatedProducts = await manager.getProducts();
    io.emit("products", updatedProducts);

  });

  
  // producs es el evento q debo escuchar desde el cliente
  socket.emit("products", manager.getProducts());
});





