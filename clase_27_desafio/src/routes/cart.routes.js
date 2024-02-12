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
        const carts = await cartDao.getAllCarts();
        res.json({

            data: carts,
            message:"Carts list",
        });

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: `Ocurrió un error : ${error.message}` });
    }
});

router.get('/:cid',async (req,res)=>{
    try{
        let cart = await cartDao.getProductsFromCart(req.params.cid);
        let products = cart.products;
        res.send(products);
    }catch(err){
        res.status(500).json({error:err});
    }
        
});

router.post('/',async (req,res)=>{
    try{
        res.send( await cartDao.createCart())
    }catch(err){
        res.status(500).json({error:err})
    }
    
});

router.post('/:cid/product/:pid', async (req,res)=>{

    try{
        const {cid,pid} = req.params
        const product = await  productDao.getProductById(pid)
        const cart = await cartDao.getCartById(cid)
        if (product == null || cart == null){
            return res.status(404).json("Producto Inexistente")
        }else{
        
            if(cart.products.some((e)=>e.product._id.toString() == product._id)){
               let index =cart.products.findIndex((e)=>e.product._id.toString() == product._id);
               cart.products[index].quantity +=1;
            }
            else{   
                cart.products.push({product:product._id});
           
            }
            const addProduct = cartDao.updateProducts(cart._id,cart);
            res.status(200).json(addProduct);
        }
      
    }catch(err){
        res.status(500).json({error:err});
        
    }
});


router.put('/:cid', async (req,res)=>{
    let cart = await cartDao.getCartById(req.params.cid);
    let products = req.body;
    products.forEach((e)=>{
        if(cart.products.findIndex((p)=>p.product._id.toString() == e._id) != -1){
            cart.products[cart.products.findIndex((p)=>p.product._id.toString() == e._id)]. quantity += e.quantity
        }else{
            cart.products.push({product:e._id,quantity:e.quantity});
        }
       
    })
    const addProduct = cartDao.updateProducts(cart._id,cart);
    res.status(200).json(addProduct);
});

router.put('/:cid/product/:pid', async (req,res)=>{
    let cart = await cartDao.getCartById(req.params.cid)
    const product = await  productDao.getProductById(req.params.pid)
    if(cart.products.some((e)=>e.product._id.toString() == product._id)){
        let index =cart.products.findIndex((e)=>e.product._id.toString() == product._id);
        cart.products[index].quantity = req.body.quantity;
        const addProduct = cartDao.updateProducts(cart._id,cart);
        res.status(200).json(addProduct);
     }
    
});

router.delete('/:cid/product/:pid', async (req,res)=>{
    try{
        let cart = await cartDao.getCartById(req.params.cid);
       
        let newProducts = cart.products.filter((e)=> e.product._id.toString() != req.params.pid)
        console.log(newProducts);
        cart.products= newProducts;
        let updatedCart = cartDao.updateProducts(req.params.cid,cart);
        res.status(201).json(updatedCart);
    }
    catch(err){ res.status(500).json({error:err})};
    
});


router.delete('/:cid', async (req,res)=>{
    try{
        let deleted = await cartDao.getCartById(req.params.cid);
        deleted.products = [];
        cartDao.updateProducts(req.params.cid,deleted);
        res.status(201).json(deleted.message);
    }
    catch(err){ res.status(500).json({error:err})}
    
});

export default router;