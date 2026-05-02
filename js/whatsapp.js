const telefono = "5493874151491";

export function crearMensaje(producto = "") {
  if (producto) {
    return `Hola Juan Pablo, quiero reservar el perfume ${producto}. ¿Cómo puedo avanzar con el pago?`;
  }

  return "Hola Juan Pablo, quiero consultar por los perfumes disponibles.";
}

export function crearLinkWhatsApp(mensaje) {
  return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
}

export function activarBotonWhatsAppGeneral() {
  const botonGeneral = document.querySelector("#btn-whatsapp-general");
  const footerWhatsApp = document.querySelector("#footer-whatsapp");

  if (botonGeneral) {
    botonGeneral.addEventListener("click", (evento) => {
      evento.preventDefault();

      const mensaje = crearMensaje();
      const link = crearLinkWhatsApp(mensaje);

      window.open(link, "_blank");
    });
  }

  if (footerWhatsApp) {
    footerWhatsApp.addEventListener("click", (evento) => {
      evento.preventDefault();

      const mensaje = crearMensaje();
      const link = crearLinkWhatsApp(mensaje);

      window.open(link, "_blank");
    });
  }
}