import { productModel } from "../../models/product.model.js";
import { cartModel } from "../../models/cart.model.js";

class ProductDao {
    constructor() {
        this.model = productModel;
    }

async getAllProducts() {
    return await productModel.find();
}

async getProductById(_id) {
    return await productModel.findById({_id});
}

async createProduct(product) {
    return await productModel.create(product);
}

async updateProduct(_id, product) {
    return await productModel.findByIdAndUpdate({_id}, product);
}

async deleteProduct(_id) {
    // elimino todos los productos del carrito y luego el producto
    await cartModel.deleteMany({product: _id});

    return await productModel.findByIdAndDelete({_id});

}

}

export default new ProductDao();