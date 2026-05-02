let carrito = [];

const telefono = "5493874151491";

function obtenerPrecioNumero(precio) {
  return Number(precio.replace("$", "").replace(".", ""));
}

function guardarCarrito() {
  localStorage.setItem("carritoPerfumes", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carritoPerfumes");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function calcularTotalCarrito() {
  return carrito.reduce((total, item) => {
    return total + obtenerPrecioNumero(item.precio) * item.cantidad;
  }, 0);
}

export function agregarAlCarrito(producto) {
  const itemEncontrado = carrito.find((item) => item.nombre === producto.nombre);

  if (itemEncontrado) {
    itemEncontrado.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  renderizarCarrito();
}

function sumarProducto(nombre) {
  const item = carrito.find((producto) => producto.nombre === nombre);

  if (item) item.cantidad++;

  guardarCarrito();
  renderizarCarrito();
}

function restarProducto(nombre) {
  const item = carrito.find((producto) => producto.nombre === nombre);

  if (item && item.cantidad > 1) {
    item.cantidad--;
  } else {
    carrito = carrito.filter((producto) => producto.nombre !== nombre);
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(nombre) {
  carrito = carrito.filter((producto) => producto.nombre !== nombre);

  guardarCarrito();
  renderizarCarrito();
}

export function renderizarCarrito() {
  const lista = document.querySelector("#carrito-lista");
  const total = document.querySelector("#carrito-total");
  const contador = document.querySelector("#carrito-contador");

  lista.innerHTML = "";

  let totalCarrito = 0;
  let cantidadTotal = 0;

  carrito.forEach((item) => {
    const precioNumero = obtenerPrecioNumero(item.precio);
    const subtotal = precioNumero * item.cantidad;

    totalCarrito += subtotal;
    cantidadTotal += item.cantidad;

    lista.innerHTML += `
      <div class="carrito__item">
        <div>
          <strong>${item.nombre}</strong>
          <span>${item.cantidad} x ${item.precio}</span>
        </div>

        <div class="carrito__acciones">
          <button data-accion="restar" data-nombre="${item.nombre}">−</button>
          <button data-accion="sumar" data-nombre="${item.nombre}">+</button>
          <button data-accion="eliminar" data-nombre="${item.nombre}">×</button>
        </div>
      </div>
    `;
  });

  total.textContent = `$${totalCarrito.toLocaleString("es-AR")}`;
  contador.textContent = cantidadTotal;

  activarAccionesCarrito();
}

function activarAccionesCarrito() {
  document.querySelectorAll("[data-accion]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const accion = boton.dataset.accion;
      const nombre = boton.dataset.nombre;

      if (accion === "sumar") sumarProducto(nombre);
      if (accion === "restar") restarProducto(nombre);
      if (accion === "eliminar") eliminarProducto(nombre);
    });
  });
}

export function activarCarrito() {
  cargarCarrito();
  renderizarCarrito();

  const botones = document.querySelectorAll(".producto__boton");
  const carritoPanel = document.querySelector("#carrito");
  const abrirCarrito = document.querySelector("#abrir-carrito");
  const cerrarCarrito = document.querySelector("#cerrar-carrito");
  const finalizarReserva = document.querySelector("#finalizar-reserva");

  botones.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();

      agregarAlCarrito({
        nombre: boton.dataset.nombre,
        precio: boton.dataset.precio
      });

      carritoPanel.classList.add("carrito--activo");
    });
  });

  abrirCarrito.onclick = () => carritoPanel.classList.add("carrito--activo");
  cerrarCarrito.onclick = () => carritoPanel.classList.remove("carrito--activo");

  finalizarReserva.onclick = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const total = calcularTotalCarrito().toLocaleString("es-AR");

    let mensaje = "Hola, quiero reservar los siguientes perfumes:%0A%0A";

    carrito.forEach((item) => {
      mensaje += `• ${item.nombre} x${item.cantidad} - ${item.precio}%0A`;
    });

    mensaje += `%0ATotal: $${total}%0A%0A`;
    mensaje += "¿Cómo puedo avanzar con el pago?";

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
  };
}