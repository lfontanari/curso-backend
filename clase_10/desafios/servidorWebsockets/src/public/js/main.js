const socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // para recibir todos los datos juntos uso formData, es un objeto en el get usa el name del campo
  const formData = new FormData(form);

  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    code: formData.get("code"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    thumbnail: formData.get("thumbnail"),
    category: formData.get("category")
  };
  socket.emit("product_send", product);
  form.reset();
});

socket.on("products", (data) => {
  const table = document.querySelector("table");
  
  table.innerHTML = "";
  

    data.forEach ((prod) => {
      const tr = document.createElement("tr");

      const tdTitle = document.createElement("td"); 
      const tdDescription= document.createElement("td"); 
      const tdCode= document.createElement("td"); 
      const tdPrice= document.createElement("td"); 
      const tdStock= document.createElement("td"); 
      const tdThumbnail= document.createElement("td"); 
      const tdCategory= document.createElement("td"); 
      const tdActions = document.createElement("td"); 
      const btnDelete = document.createElement("button");

      tdTitle.textContent = prod.title;
      tdDescription.textContent = prod.description;
      tdCode.textContent = prod.code;
      tdPrice.textContent = prod.price;
      tdStock.textContent = prod.stock;
      tdThumbnail.textContent = prod.thumbnail;
      tdCategory.textContent = prod.category;
      btnDelete.textContent = "Eliminar";
      btnDelete.addEventListener("click", () => {

    })
    
    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdCode);
    tr.appendChild(tdPrice);
    tr.appendChild(tdStock);
    tr.appendChild(tdThumbnail);
    tr.appendChild(tdCategory);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);

    table.appendChild(tr);
    
    });
  
  
  

});