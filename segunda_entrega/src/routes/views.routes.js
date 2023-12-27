import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";
import productDao from "../daos/dbManager/product.dao.js";

const router = new Router();

router.get('/',async (req,res)=>{
  const { limit,page,query,sort } = req.query
  const productos = await productDao.getAllProducts(limit, page, query, sort);

  res.render("products",{productos})
})

router.get('/carts/:cid',async (req,res)=>{
  const {cid} = req.params
  const productos = await cartDao.getProductsFromCart(cid)
  console.log(productos)
  res.render("cart",{productos})
})

  
export default router;