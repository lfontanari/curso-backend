
import { readFileSync, existsSync, promises } from 'fs';

class ProductManager {
    
    constructor (path) {
        //this.nextId=1; // contador para el ID autoincremental 
        this.path=path; 
        try {
            // Comprueba la existencia del archivo de forma síncrona
            if (existsSync(this.path)) {
                // Si el archivo existe, lee y parsea su contenido
                const productos = readFileSync(this.path, 'utf-8');
                this.products = JSON.parse(productos);

                let productoConIDMayor = this.products.reduce((maxProduct, currentProduct) => {
                    return currentProduct.id > maxProduct.id ? currentProduct : maxProduct;
                }, this.products[0]); // Inicializa con el primer producto
                

                this.nextId= productoConIDMayor.id; // contador para el ID autoincremental 
                
                console.log("en el constructor.....");
                console.log(this.nextId);
            } else {
                // Si el archivo no existe, inicializa la lista de productos vacía
                this.products = [];
                this.nextId=1; // contador para el ID autoincremental 
            }
        } catch (error) {
            // Maneja cualquier otro error que pueda ocurrir
            console.error('Error:', error.message);
        }
            
    } 

    

    async addProduct(product) {
        //console.log(product);
        // Validar que no se repita el campo "code"
        if (this.products.some(existingProduct => existingProduct.code === product.code)) {
            throw new Error("Error: El código " + product.code + " se repite en otro producto");
        }
       

        // Validar que todos los campos sean obligatorios
        const requiredFields = ["title", "description", "price", "status", "code", "stock","category"];
        for (const field of requiredFields) {
            if (!product[field]) {
            throw new Error(`Error: El campo '${field}' es obligatorio.`);
            }
        }

        // Asignar el ID autoincremental al producto
        console.log("en addProduct.....");
        console.log(this.nextId);
        this.nextId++
        product.id = parseInt(this.nextId);
        //this.nextId++; // Incrementar el contador para el siguiente ID
        console.log(this.nextId);
        try {
            this.products.push(product);
            await promises.writeFile(
              this.path,
              JSON.stringify(this.products, null, "\t")
            );
          } catch (error) {
            console.log(`Hubo un error al guardar los datos: ${error}`);
            return;
          }
    }

   
    async deleteProductById(id) {
        console.log(id);
        console.log(this.products);
        const prod = this.products.find((p) => p.id === parseInt(id.trim()));
        
        console.log(prod);
        if (!prod) {
              return console.log("El producto no existe");
        }
        
        const index = this.products.findIndex((p) => p.id === parseInt(id.trim()));
        
        try {
              this.products.splice(index, 1);
              await promises.writeFile(
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
       
        const prod = this.products.find((p) => p.id === parseInt(id.trim()));
         
        if (!prod) {
              return console.log("El producto no existe !");
        }
        
        const index = this.products.findIndex((p) => p.id === parseInt(id.trim()));
        
        try {
              this.products[index]=updProduct;
              this.products[index].id=parseInt(id); // para no perder el id original

              await promises.writeFile(
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
            const productos = readFileSync(this.path, 'utf8');
            this.products = JSON.parse(productos);
             
            const existe = this.products.find(p => p.id === id);
            if (!existe) {
                throw new Error(`No existe el producto ${id}`);
               
            } else {
                
                return existe;
            }
          } 
          catch (error) {
            throw new Error(`Hubo un error al recuperar el producto: ${error.message}`);
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

export { ProductManager };
