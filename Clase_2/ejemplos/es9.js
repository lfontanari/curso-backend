const objeto1={
    nombre: "LORE",
    edad: 52,
    colorFav: "Verde"
};

const objeto2={
    nombre: "DARI",
    edad: 53,
   
};

// spread operator
// siempre se queda con el objeto de la derecha, y si no tiene mismas propiedades las agrega
const objeto3={...objeto1 , ...objeto2 };
console.log(objeto3);

const objeto4={...objeto1 , ...objeto2, equipo: "BOCA" };
console.log(objeto4);

// ejemplo de  ...rest devuelve el resto de las otras propiedades
const nuevoObjeto = {
    a:"Algo",
    b:"Otro algo",
    c:"Algo mas"
}
const {b, ...resto} = nuevoObjeto;

//console.log(a);
console.log(resto);
console.log(resto.a);
console.log(resto.c);


