// const fs = require("node:fs")
//import { promises as fs } from 'node:fs'; // forma asincrona

// import fs from "fs"; 
// import { promises as fs } from "fs";
//import { promises as fsPromises } from "fs";
import { readFileSync, existsSync } from 'fs';

// import { promises as fs } from "node:fs";

// Ahora puedes usar fs.readFile, fs.writeFile, etc.

// Ahora puedes usar fs.readFile, fs.writeFile, etc.


// Ahora puedes usar fs.readFile, fs.writeFile, etc. de forma síncrona.

class ProductManager {
    
    

    constructor (path) {
        this.nextId=1; // contador para el ID autoincremental 
        this.path=path; 
        try {
            // Comprueba la existencia del archivo de forma síncrona
            if (existsSync(this.path)) {
                // Si el archivo existe, lee y parsea su contenido
                const productos = readFileSync(this.path, 'utf-8');
                this.products = JSON.parse(productos);
            } else {
                // Si el archivo no existe, inicializa la lista de productos vacía
                this.products = [];
            }
        } catch (error) {
            // Maneja cualquier otro error que pueda ocurrir
            console.error('Error:', error.message);
        }
            
    } 


    

    async addProduct(product) {
        // Validar que no se repita el campo "code"
        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            throw new Error("Error: El código " + product.code + " se repite en otro producto");
        }
       

        // Validar que todos los campos sean obligatorios
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        for (const field of requiredFields) {
            if (!product[field]) {
            throw new Error(`Error: El campo '${field}' es obligatorio.`);
            }
        }

        // Asignar el ID autoincremental al producto
        product.id = this.nextId;
        this.nextId++; // Incrementar el contador para el siguiente ID
        
        try {
            this.products.push(product);
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(this.products, null, "\t")
            );
          } catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
          }
    }

   
    async deletProductById(id) {
       
        const prod = this.products.find((p) => p.id === id);
        
        if (!prod) {
              return console.log("El producto no existe");
        }
        
        const index = this.products.findIndex((p) => p.id === id);
        
        try {
              this.products.splice(index, 1);
              await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
              );
        } catch (error) {
              console.log(`Hubo un error al eliminar un producto: ${error}`);
              return;
        }
    }
    

    async updateProductById(id, updProduct){
        // Validar que todos los campos sean obligatorios
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        for (const field of requiredFields) {
            if (!updProduct[field]) {
            throw new Error(`Error: El campo '${field}' es obligatorio.`);
            }
        }
       
        const prod = this.products.find((p) => p.id === id);
        
        if (!prod) {
              return console.log("El producto no existe");
        }
        
        const index = this.products.findIndex((p) => p.id === id);
        
        try {
              this.products[index]=updProduct;
              this.products[index].id=id; // para no perder el id original

              await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
              );
        } catch (error) {
              console.log(`Hubo un error al actualizar un producto: ${error}`);
              return;
        }

    }
    

     getProductById(id) {
        try {
            const productos = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(productos);
             
            const existe = this.products.find(p => p.id === id);
            if (!existe) {
                console.log("No existe el producto " + id);
                return null;
            } else {
                console.log("El producto existe, codigo: " + existe.code);
                return existe;
            }
          } 
          catch (error) {
            console.log(`Hubo un error al recuperar el producto: ${error}`);
            return null;
          }
    }

    
    

    getProducts() {
        return this.products;
    }
}

class Product {

    constructor (title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    };

}

//export { Product};
export { ProductManager };
// export default ProductManager;

// si uso export default Product / luego en el server debo poner: import ProductManager from "ProductManajer.js";
// si uso export {Product} , luego va import {Product} from "ProductManajer.js";

