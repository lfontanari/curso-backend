const numeros = [1,2,3,4,5,6];

function cuadrado(numero) {
    return numero ** 2;
}

const numerosNuevos = numeros.map(cuadrado) ;

// funciones anonimas cuando solo se usan una vez
const numeros2 = [1,2,3,4,5,6];

const numerosNuevos2 = numeros.map((numero) => {
    return (numero ** 2)});

// si uso llaves va un return , sino es implicito

console.log(numerosNuevos);

function mapCustom(array, callback) {
 let nuevoArray = [];

 for (let i = 0; i < array.length; i++) {
    let nuevoValor = callback(array[i]);
    nuevoArray.push(nuevoValor);
 }
  
 return nuevoArray;
}

const nuevoArr= mapCustom(numeros, (valor) => {
    return valor * 2;});

console.log(nuevoArr);

