import mongoose from "mongoose";

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    cart: {      
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    rol: {
        type: String,
        default: 'user'
    }
});

const userModel = new mongoose.model(collection, schema);

export default userModel;