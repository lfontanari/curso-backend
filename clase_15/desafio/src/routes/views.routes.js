import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";
import productDao from "../daos/dbManager/product.dao.js";

const router = new Router();

router.get('/', async (req, res) => {
 //res.render("home.hbs");
 const carts = await cartDao.findCarts();
 const products = await productDao.getAllProducts();

 res.render("index", {
    carts,
    products
 })
});

router.get("/realtimeproducts", (req, res) => {
    res.render("products.hbs");
  });
  
export default router;