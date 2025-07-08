document.addEventListener('DOMContentLoaded', () => {
    // Tomamos los elementos

    const contenedorElementosCarrito = document.getElementById('elementosCarrito');
    const elementoTotalCarrito = document.getElementById('totalCarrito');
    const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        contenedorElementosCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            contenedorElementosCarrito.innerHTML = '<p>El carrito está vacío.</p>';
            elementoTotalCarrito.textContent = 'Total: $0.00';
            return;
        }

        // *** USANDO TEMPLATE STRINGS PARA CONSTRUIR EL HTML DE LOS ÍTEMS ***
        
const itemsHtml = carrito.map(item => {
  total += item.precio * item.cantidad;

  return `
    <div class="item-carrito">
      <img src="${item.imagen}" alt="${item.nombre}">
      <span>${item.nombre} (x${item.cantidad})</span>
      <div>
        <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        <button class="btn-eliminar-item" id="btn-eliminar-${item.id}">Eliminar</button>
      </div>
    </div>
  `;
});



        // Unimos todos los strings HTML y los insertamos en el contenedor
        contenedorElementosCarrito.innerHTML = itemsHtml.join('');
        elementoTotalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        carrito.forEach(item => {
            const botonEliminar = document.getElementById(`btn-eliminar-${item.id}`);
            if (botonEliminar) { // Asegurarse de que el botón exista
                botonEliminar.addEventListener('click', () => {
                    // Cuando se hace clic, ya tenemos acceso al ID del item original
                    eliminarProductoDelCarrito(item.id);
                });
            }
        });

        function eliminarProductoDelCarrito(idProducto) {
            let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

            const carritoActualizado = carrito.map(item => {
                if (item.id === idProducto) {
                    // Creamos un nuevo objeto con las propiedades exactas que necesitamos.
                    // Copiamos id, nombre, precio y reducimos la cantidad.
                    return {
                        id: item.id,
                        nombre: item.nombre,
                        precio: item.precio,
                        imagen: item.imagen,
                        cantidad: item.cantidad - 1 // Aquí se decrementa la cantidad
                    };
                }
                return item; // Si no es el producto a modificar, lo devolvemos tal cual
            }).filter(item => item.cantidad > 0); //Mantiene solo aquellos ítems cuya cantidad sea mayor que cero

            localStorage.setItem('carritoDeCompras', JSON.stringify(carritoActualizado));
            renderizarCarrito();
        }

    }


    renderizarCarrito();

    botonVaciarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carritoDeCompras');
        renderizarCarrito();
        alert('El carrito ha sido vaciado.');
    });

    const botonPagar = document.getElementById('btnPagar');

  botonPagar.addEventListener('click', () => {
    alert('En construcción');
    localStorage.removeItem('carritoDeCompras');
    window.location.href = 'index.html';
  });


})