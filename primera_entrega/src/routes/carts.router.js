import { Router } from "express";

const router = Router();


router.post("/", async (req, res) => {

    const { title, description, code, price, stock, category , thumbnails} = req.body;
    /* status es true por defecto, todos los campos obliagorios menos thumbnails (lo valida la clase)*/
    //console.log(title, description, code, price, stock, category,thumbnails);
  
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
    manager.addProduct(producto);
   
    res.json({ message: `Producto Titulado: ${title} fue agregado correctamente.` });
    
  });


export default router;