const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},

	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
];

const productos =[];

objetos.forEach((objeto) => 
{
    const keys = Object.keys(objeto);
    keys.forEach((key) => {
    if (!productos.includes(key)) {
        productos.push(key);
    }
    });
});
 
console.log(productos);

// mostrar el total de todos los productos
let totalProductos=0;
objetos.forEach((objeto) => {
    let keyValues = Object.entries(objeto);

    keyValues.forEach((prod) => {
        totalProductos+=prod[1];
    });
});

console.log(totalProductos);