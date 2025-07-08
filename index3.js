
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

/*configuro los eventos de escucha para los botones "contacto" (en la nav-bar y el footer) que llaman al formulario con una ventana emergente*/
document.getElementById("abrir-formulario").addEventListener("click", abrirFormulario);
document.getElementById("btn-contacto").addEventListener("click", abrirFormulario);

function abrirFormulario(event) {
  if (event) {
    event.preventDefault();
  }
  document.getElementById("formulario-emergente").style.display = "flex";
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";
}

document.getElementById("cancelar-formulario").addEventListener("click", function() {
  document.getElementById("formulario-emergente").style.display = "none";
});

/****************************VENTANA EMERGENTE PARA EL README ******************************/
 // Selecciono el enlace "About" de la barra de navegación por su id
    const aboutLink = document.querySelector('#about');
    
    //tomamos las referencias a los elementos de la ventana emergente
    const readmeOverlay = document.getElementById('readme-emergente');
    const readmeContainer = document.getElementById('readme-container');
    const closeButton = document.getElementById('botonCerrar');
    const loadingMessage = document.getElementById('loading-message');

    // coloco en una constante la URL del archivo README alojado en GitHub
    const readmeUrl = 'https://raw.githubusercontent.com/OzcarFX/CarritoOscar/main/README.md';

    /**Función asíncrona para cargar el contenido del archivo README desde la URL.*/
      const loadReadmeContent = async () => {
        // Muestra el mensaje de carga
        loadingMessage.style.display = 'block';
        // Limpia cualquier contenido previo en el contenedor del README
        readmeContainer.innerHTML = '';

        try {
            // Realiza la solicitud fetch para obtener el contenido del README
            const response = await fetch(readmeUrl);
            
            // Verifica si la respuesta de la red fue exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
            
            // Obtiene el texto de la respuesta
            const readmeText = await response.text();
            
            // Asigna el texto al contenedor. textContent se muestro como texto plano, manteniendo los saltos de línea.
            readmeContainer.textContent = readmeText;
        } catch (error) {
            // Captura y registra cualquier error durante la carga
            console.error('Error al cargar el README:', error);
            // Muestra un mensaje de error al usuario
            readmeContainer.textContent = 'Error al cargar el contenido del README. Por favor, inténtalo de nuevo más tarde.';
        } finally {
            // Oculta el mensaje de carga una vez que la operación ha terminado (éxito o error)
            loadingMessage.style.display = 'none';
        }
    };

    /** Abre la ventana emergente y carga el contenido del README.*/
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        loadReadmeContent(); // Llama a la función para cargar el contenido del README
        readmeOverlay.style.display = 'flex'; // Muestra la ventana emergente (usando flex para centrado)
    });

    
    closeButton.addEventListener('click', () => {
        readmeOverlay.style.display = 'none'; // Oculta la ventana emergente
    });

    readmeOverlay.addEventListener('click', (e) => {
        // Si el clic fue directamente en el overlay (no en el contenido dentro de él)
        if (e.target === readmeOverlay) {
            readmeOverlay.style.display = 'none'; // Oculta la ventana emergente
        }
    });

/************************************************************************************ */

})
