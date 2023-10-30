const objeto = {
    nombre: "Lorena",
    edad: 52,
    colorFav: "Verde"
}

console.log(objeto);
console.log(Object.keys(objeto));
console.log(Object.values(objeto));
console.log(Object.entries(objeto));

const propiedades = Object.keys(objeto);

propiedades.forEach((prop) => {
    console.log(prop);
});


const numeros= [100, 200, 300, 400];
// util para sacar promedio, recorriendo el Array
const total = numeros.reduce((valorPrevio, valorAcumulado) => valorPrevio + valorAcumulado);
console.log(total);




