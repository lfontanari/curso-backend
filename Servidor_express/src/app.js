import express from "express";
import {ProductManager} from "./ProductManager.js";
const app = express();
const manager = new ProductManager("./src/Productos.json");

const PORT=8080;

 
app.use(express.urlencoded({ extended: true }));

// Endpoints productos con limite de resultados
 
app.get("/products", (req, res) => {
    
    const {limit} = req.query;
    const products = manager.getProducts();
    // si no recibe limete devolver todos los productos
    if (!limit || products.length < limit) {
        
        res.json({ products });
    } else {
        const limitedProducts = products.slice(0, limit);
        res.json({ limitedProducts });
    }
        
});


app.get("/products/:pid", (req, res) => {
    const {pid} = req.params;
    const products = manager.getProducts();
    let product = products.find(p=> p.id === parseInt(pid));
    if (!product) return res.json({error: `El producto con id: ${pid} no existe`});

    res.json({product});

  });

// ahora pongo para q escuche en puerto 8080
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));