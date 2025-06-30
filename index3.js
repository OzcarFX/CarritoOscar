document.addEventListener('DOMContentLoaded', () => {
  const contenedorListaProductos = document.getElementById("contenedorListaProductos");

fetch('https://raw.githubusercontent.com/OzcarFX/PFI25020_NAGY/main/productos.json')
  .then(response => response.json())
  .then(productos => {
    let productosHtml = '';
    productos.forEach(producto => {

      productosHtml += `
        <div class="item-producto">
          <img src="${producto.image}" alt="${producto.title}">
          <h2>${producto.title}</h2>
          <p>Precio: $${producto.price.toFixed(2)}</p>
          <button class="btn-agregar-carrito" id="btn-agregar-${producto.id}">Agregar al Carrito</button>
        </div>
      `;

    });
    contenedorListaProductos.innerHTML = productosHtml;

    adjuntarEventosAgregarCarrito(productos);
  })
  .catch(error => console.error(error));


  function adjuntarEventosAgregarCarrito(productosDisponibles) {
    productosDisponibles.forEach(producto => {
      const boton = document.getElementById(`btn-agregar-${producto.id}`)
      if (boton) {
        boton.addEventListener('click', () => {
          agregarProductoAlCarrito(producto);
        })
      }
    })
  }
 
function agregarProductoAlCarrito(productoAAgregar) {
  let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

  const indiceProductoExistente = carrito.findIndex(item => item.id === productoAAgregar.id);

  if (indiceProductoExistente !== -1) {
    carrito[indiceProductoExistente].cantidad++;
  } else {
    carrito.push({
      id: productoAAgregar.id,
      nombre: productoAAgregar.title,
      precio: productoAAgregar.price,
      imagen: productoAAgregar.image, // Establece la propiedad imagen correctamente
      cantidad: 1
    });
  }

  localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
  alert(`${productoAAgregar.title} agregado al carrito!`);
}


document.getElementById("abrir-formulario").addEventListener("click", function() {
  document.getElementById("formulario-emergente").style.display = "flex";
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";
});

document.getElementById("cancelar-formulario").addEventListener("click", function() {
  document.getElementById("formulario-emergente").style.display = "none";
});



})
