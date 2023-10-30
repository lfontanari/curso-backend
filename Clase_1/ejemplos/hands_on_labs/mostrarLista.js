const mostrarLista = (arr) => {
     if (arr.length == 0) return "Lista vacia";
     // no me salio el ejemplo, revisar la grabacion

     console.log(arr.map((elementos)) );

    return(`La longitud de la lista es ${arr.length}`);
}

console.log(mostrarLista([3]));