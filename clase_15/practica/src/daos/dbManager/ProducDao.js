import { productModel } from "../models/product.model.js";



class ProductDao {

    async addProduct (nuevoProducto) {
        try {
        await productModel.create(nuevoProducto);
        }
        catch (err) { conslole.log(err); }

    }

    async getProducts(){
        return await productModel.find()
    }
    
    async getProductsById (id) {
        return await productModel.findById(id);
    }

}

export { ProductDao }