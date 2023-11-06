const fs = require("fs");

class ProductManager {
   
    constructor (path) {
        
        this.nextId=1; // contador para el ID autoincremental 
        this.path=path; 
        if (fs.existsSync(path)) {
            try {
                let productos = fs.readFileSync(this.path, "utf-8");
                this.products = JSON.parse(productos);
            } catch {
                this.products = [];
            }
        } else {
            this.products = [];
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

// Pruebas
// Prueba 1: agrego los productos y genera el .json --------------------------

    const manejadorProductos = new ProductManager("./Productos.json");
    console.log ("productos en la lista");
    console.log(manejadorProductos.getProducts());
    console.log("--------------------------------------------------------");

    console.log("agregando un producto");
    manejadorProductos.addProduct(
        new Product("producto prueba", "Este es un producto prueba", 200 , "sin imagen", "abc126", 25)
    );
    console.log("--------------------------------------------------------");
    console.log("agregando un producto");
    manejadorProductos.addProduct(
        new Product("producto prueba", "Este es un producto prueba", 300 , "sin imagen", "abc124", 25)
    );
    console.log("--------------------------------------------------------");
    console.log("agregando un producto");
    manejadorProductos.addProduct(
        new Product("producto prueba", "Este es un producto prueba", 400 , "sin imagen", "abc125", 25)
    );
    console.log("--------------------------------------------------------");
    console.log ("productos en la lista");
    console.log(manejadorProductos.getProducts());

// fin Prueba 1 --------------------------------------------------------------


// Prueba 2 , con el .json creado busco un producto --------------------------
/*
    const manejadorProductos = new ProductManager("./Productos.json");
    console.log ("productos en la lista");
    console.log(manejadorProductos.getProducts());
    console.log("--------------------------------------------------------");

    let producto;
    producto=manejadorProductos.getProductById(3);

    console.log(`producto: ${JSON.stringify(producto , null, 2)}`);
*/
// fin Prueba 2 --------------------------------------------------------------


// Prueba 3 , con el .json creado busco un producto  y actualizo --------------------------
/*
    const manejadorProductos = new ProductManager("./Productos.json");
    console.log ("productos en la lista");
    console.log(manejadorProductos.getProducts());
    console.log("--------------------------------------------------------");

    manejadorProductos.updateProductById(2, new Product("producto UPDATE", "Este es un producto UPDATE", 400 ,"sin imagen UPD",  "UPD124", 250));
    
    console.log ("productos en la lista");
    console.log(manejadorProductos.getProducts()); 
*/  
// fin Prueba 3 --------------------------------------------------------------

// Prueba 4 , con el .json creado busco un producto  y lo borro---------------
/*
const manejadorProductos = new ProductManager("./Productos.json");
console.log ("productos en la lista");
console.log(manejadorProductos.getProducts());
console.log("--------------------------------------------------------");

manejadorProductos.deletProductById(2);

console.log ("productos en la lista");
console.log(manejadorProductos.getProducts()); 

 
*/
// fin Prueba 4 --------------------------------------------------------------


// agrego mismo producto para que arroje error por estar el codigo repetido.
/*
console.log("agregando mismo producto");
manejadorProductos.addProduct(
    new Product("producto prueba", "Este es un producto prueba", 200 , "sin imagen", "abc123", 25)
);

console.log ("productos en la lista");
console.log(manejadorProductos.getProducts());
*/
