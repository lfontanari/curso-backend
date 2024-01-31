async function addItem(index){
      
    let data = await  fetch('/api/products');
    let productos = await data.json();

    // console.log(productos.docs.length);
   // console.log(productos);
 
    if (productos.data.docs && index < productos.data.docs.length) {
        // Accede a productos.docs[index] aquí
        console.log(productos.data.docs[index]);
    } else {
        console.error('Índice fuera de rango o productos no definidos.');
    }

    
    let cargar = await fetch(`/api/carts/658bab8dec421ffe74ca3357/product/${productos.data.docs[index]._id}`,{method:"POST"})
}

function logout(){
    fetch('/logout')
    .then(result => {
        if (result.status === 200) {
            window.location.replace('/users/login');
      
        }
    })

}