const sumar = (num1,num2) => num1 + num2;
const multiplicar = (num1,num2) => num1 * num2;
// el callback siempre va a lo ultimo en los parametros
function calcular (num1,num2,callback) {
    return callback(num1,num2);
}

console.log(calcular(2,3, sumar)); 
console.log(calcular(2,3, multiplicar)); 


// callbacks anidados , ojo, pueden traer problemas es muuy dificil de leer que hace

setTimeout(() => {
    console.log("hola");
}, 2000);