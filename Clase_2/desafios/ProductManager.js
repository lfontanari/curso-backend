class ProductManager {
   
    constructor () {
        this.products=[];
    }

    addProduct(product) {
       
        // crear el producto con id autoincremental
        if (this.products.length ===0) {
            product.id=1;
         } else {
             // valido q no repita el campo code
            
            const producto = this.products.find(producto => producto.code === product.code);
            
            if (producto) {
                console.log ("Error: el codigo " + product.code + " se repite en otro producto");
                return;
            }

            product.id= this.products[this.products.length - 1].id + 1;
             
         }
       
        
        this.products.push(product);
        

    }
    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            return ("Product Not Found: " + id); 
        } else return product;
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
const manejadorProductos = new ProductManager();
console.log ("productos en la lista");
console.log(manejadorProductos.getProducts());

console.log("agregando un producto");
manejadorProductos.addProduct(
    new Product("producto prueba", "Este es un producto prueba", 200 , "sin imagen", "abc123", 25)
);
console.log ("productos en la lista");
console.log(manejadorProductos.getProducts());

// agrego mismo producto para que arroje error por estar el codigo repetido.
console.log("agregando mismo producto");
manejadorProductos.addProduct(
    new Product("producto prueba", "Este es un producto prueba", 200 , "sin imagen", "abc123", 25)
);

console.log ("productos en la lista");
console.log(manejadorProductos.getProducts());

