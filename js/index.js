import { productos, renderizarProductos } from "./productos.js";
import { activarCarrito } from "./carrito.js";
import { activarBotonWhatsAppGeneral } from "./whatsapp.js";

const productosGrid = document.querySelector("#productos-grid");

// Render de productos
renderizarProductos(productos, productosGrid);

// Activar carrito
activarCarrito();

// Activar WhatsApp (botón general + footer)
activarBotonWhatsAppGeneral();

/* 🔥 EFECTO LUPA */

const imagenes = document.querySelectorAll(".producto__imagen");

imagenes.forEach((contenedor) => {
  const img = contenedor.querySelector("img");

  contenedor.addEventListener("mouseenter", () => {
    contenedor.classList.add("zoom");
  });

  contenedor.addEventListener("mouseleave", () => {
    contenedor.classList.remove("zoom");
    img.style.transformOrigin = "center center";
  });

  contenedor.addEventListener("mousemove", (e) => {
    const rect = contenedor.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  });
});