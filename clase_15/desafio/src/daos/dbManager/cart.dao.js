import { cartModel } from "../../models/cart.model.js";

class CartDao {
    constructor() {
        this.model = cartModel;
    }


async findCarts() {
    return await cartModel.find();
}

async getCartById(id) {
    return await cartModel.findById(id);
}

async createCart(cart) {
    return await cartModel.create(cart);
}

async updateCart(id, cart) {
    return await cartModel.findByIdAndUpdate(id, cart);
}

async deleteCart(id) {
    return await cartModel.findByIdAndDelete(id);
}

}

export default new CartDao();