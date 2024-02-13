
// importar capa servicios
import { getAllProducts, getProductById, updateProduct, deleteProduct, createProduct} from '../services/db/product.Services.js';


export const getProductsControllers = async (req,res)=>{
  try{
      const { limit,page,query,sort } = req.query
      const productos = await getAllProducts(limit, page, query, sort);
      
      res.json({
        data: productos,
        message: "Product list",
      });
      
  }
  catch(err){
      res.status(500).json({error:err})
  }
};

export const getIdProductsControllers = async (req,res)=>{
  try{
      
      const{ pid } = req.params
      const producto = getProductById(pid)
      res.json(producto)

  }
  catch(err){
      res.status(500).json({error:err})
  }
};

export const postProductsControllers = async (req,res)=>{
  try{
      let producto = req.body
      const newProduct = await createProduct(producto)
      res.status(201).json({message: "Producto agregado correctamente"})
  }
  catch(err){
      res.status(500).json({error:err})
  }

};

export const putProductsControllers = async (req,res)=>{
  try{
      let productoModificado = req.body
      let modified = await updateProduct(req.params.pid,productoModificado)
      res.status(201).json(modified)
  }
  catch(err){
      res.status(500).json({error:err})
  }    
};

export const deleteProductsControllers = async (req,res)=>{
  try{
      let deleted =await deleteProduct(req.params.pid)
      res.status(201).json(deleted.message)
  }
  catch(err){ res.status(500).json({error:err})}
  
};

