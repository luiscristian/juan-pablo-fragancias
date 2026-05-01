const telefono = "549XXXXXXXXXX";

export function crearMensaje(producto = "") {
  if (producto) {
    return `Hola Juan Pablo, quiero consultar por el perfume: ${producto}`;
  }

  return "Hola Juan Pablo, quiero consultar por los perfumes disponibles.";
}

export function crearLinkWhatsApp(mensaje) {
  return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
}

export function activarBotonesWhatsApp() {
  const botonesProductos = document.querySelectorAll(".producto__boton");
  const botonGeneral = document.querySelector("#btn-whatsapp-general");

  botonesProductos.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();

      const producto = boton.dataset.producto;
      const mensaje = crearMensaje(producto);
      const link = crearLinkWhatsApp(mensaje);

      window.open(link, "_blank");
    });
  });

  botonGeneral.addEventListener("click", (evento) => {
    evento.preventDefault();

    const mensaje = crearMensaje();
    const link = crearLinkWhatsApp(mensaje);

    window.open(link, "_blank");
  });
}