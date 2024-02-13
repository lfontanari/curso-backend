import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';  // para cofiguracion del handlebars
import  config  from './config/config.js'; // para cofiguracion del config 

import viewsRouter from './routes/views.router.js'; 
import session from 'express-session';
import { Server } from "socket.io";
import http from 'http';
 
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

// passport import
import passport from 'passport';
import initializePassport from './config/passport.config.js';


// Imports routers
import sessionsRouter from './routes/sessions.router.js';
import usersViewRouter from './routes/users.views.router.js';
// import productsRouter from "./routes/product.routes.js";
import productsRouter from "./routes/product.router.js";
import jwtRouter from './routes/jwt.router.js'
import usersRouter from './routes/users.router.js';
import cartsRouter from "./routes/cart.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";

// esto sirve para recorrer arrays en handlebars
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

const app = express();
// Middleware
// JSON settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
//app.set('views', __dirname + '/views');

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


// const MONGO_URL = "mongodb://127.0.0.1:27017/eCommerce?retryWrites=true&w=majority";
const MONGO_URL = config.urlMongo;


app.use(session( 
    // ttl: time to live in seconds
    // retires: reintentos para q el servidor lea el archivo del storage
    // path: ruta a donde se buscara el archivo del session store
    // los archivitos de las sessiones no se borran, van generando gran cant de basura, es la desventaja
    {
         // Usando --> connect-mongo
         store: MongoStore.create({
            mongoUrl: MONGO_URL,
            //mongoOptions --> opciones de confi para el save de las sessions
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10 * 60
        }),

        secret: "1234",
        resave: false, // guarda en memoria
        saveUninitialized: true //lo guarda a penas se crea
    }
));
// middleware de passaport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// router
app.use('/', viewsRouter);
app.use('/users', usersViewRouter);
app.use("/api/jwt", jwtRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/github", githubLoginViewRouter)

// configuro el puerto
// const PORT= process.env.PORT || 8080;
const PORT = config.port;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);

    // console.log(process);
    // console.log(process.argv);
    // exluyendo los argv por defecto
    // console.log(process.argv.slice(2));
    const args = process.argv.slice(2);
    // existe un a libreria q ayuda a procesar los flags de la linea de comando, para no iterar buscando a mano
    // hay q instalar npm i commander

}).on('error', (err) => {
    console.error(`Error starting server: ${err.message}`);
});


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

// connect MontoDB
const connectMongoDB = async () => {
    try{
        await mongoose.connect(MONGO_URL);
        console.log ("Conectado con exito a la db usando mongoose");
    } catch(error){
        console.error("no se pudo conectar al a bd usando mongoose " + error);
        process.exit();
    }
};

connectMongoDB();