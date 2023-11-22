import { readFileSync, existsSync, promises } from 'fs';

class CartManager {
    
    constructor (path) {
        this.nextId=1; // contador para el ID autoincremental 
        this.path=path; 
        try {
            // Comprueba la existencia del archivo de forma síncrona
            if (existsSync(this.path)) {
               
                // Si el archivo existe, lee y parsea su contenido
                const carritos = readFileSync(this.path, 'utf-8');
                this.carts = JSON.parse(carritos);
               
                // Calcular el siguiente ID en función del último producto en el archivo
                if (this.carts.length > 0) {
                    const lastCart = this.carts[this.carts.length - 1];
                this.nextId = lastCart.cid + 1;
               
                }
             
            } else {
                // Si el archivo no existe, inicializa la lista de carritos vacía
                this.carts = []; 
            }
        } catch (error) {
            // Maneja cualquier otro error que pueda ocurrir
            throw new Error(`Hubo un error en el constructor: ${error.message}`);
        }
            
    } 

    // agrega un nuevo carrito
    async addCart( cart) {      

        // Validar que todos los campos sean obligatorios
        const requiredFields = ["products"];
        for (const field of requiredFields) {
            if (!cart[field]) {
            throw new Error(`Error: El campo '${field}' es obligatorio.`);
            }
        }

        // Asignar el ID autoincremental al producto
        cart.cid = parseInt(this.nextId);
        
        try {
            this.carts.push(cart);
            await promises.writeFile(
              this.path,
              JSON.stringify(this.carts, null, "\t")
            );
          } catch (error) {
            throw new Error(`Hubo un error al guardar los datos: ${error.message}`);
          }
    }

     // agrega el producto al arreglo "products" del carrito seleccionado, agregando un objeto 
     // del constructor prodCart
     async addCartProd( cid, pid) {
          
        const cart = this.carts.find((c) => c.cid === parseInt(cid.trim()));    
        if (!cart) {
            throw new Error(`No existe el carrito ${cid}`);
        }
        // si existe carrito , buscar en la lista de productos el producto con ese pid y sumar 1 a la propiedad quantity 
        // Asignar el ID del producto que viene en el parametro pid
        // reviso si el producto con id = pid ya existe en el carrito, sino lo tengo q crear
        // recupero la lista de productos del carrito cid
        let productos = this.getCartById(cid);
        
        const index = productos.findIndex((p) => p.product === parseInt(pid.trim()));
       
        if (productos.length === 0 || index < 0) {
            
            const prod=new ProdCart(parseInt(pid), 1);
            productos.push(prod);
        } else {
             
            productos[index].quantity++;
        }
        
        try {

            await promises.writeFile(
              this.path,
              JSON.stringify(this.carts, null, "\t")
            );
          } catch (error) {
            throw new Error(`Hubo un error al guardar los datos: ${error.message}`);
          }
    }

    // listar los productos q pertenezcan al carrito con el cid = parametro cid
    getCartById(cid) {
        try {
            const carritos = readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(carritos);
             
            const existe = this.carts.find(c => c.cid === parseInt(cid));
            
            if (!existe) {
                throw new Error(`No existe el carrito ${cid}`);
               
            } else {
                
                return existe.products;
            }
          } 
          catch (error) {
            throw new Error(`Hubo un error al recuperar el producto: ${error.message}`);
          }
    }

}


class Cart {

    constructor (cid, products) {
        this.cid = cid;
        this.products = products;
    };

}

class ProdCart {

    constructor (product, quantity) {
        this.product = product;
        this.quantity = quantity;
    };

}

export { CartManager };
export { Cart };