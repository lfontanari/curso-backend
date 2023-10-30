// const llamadaAApi = async () => {}

async function llamadaAApi () {
    try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await respuesta.json();
    } catch (error) {
        console.error("hubo un error " + error);
    }
}

llamadaAApi();