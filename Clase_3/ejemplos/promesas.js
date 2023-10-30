function dividir (num1, num2) {
 return new Promise((resolve, reject) => {

    if (num2===0) { reject("no se puede dividir por 0"); }
    else { resolve(num1/num2); }
 })

}

let respuesta = dividir(3,0)
    .then((resultado) => {
            console.log(resultado);
        })
    .catch((error) => {console.log(error); 
    });

console.log(respuesta);


fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {console.log(error);
    });
