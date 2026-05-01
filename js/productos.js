export const productos = [
  {
    nombre: "Aroma Intenso",
    categoria: "Importado",
    descripcion: "Fragancia fuerte y duradera",
    precio: "$10.000",
    imagen: "img/perfumes/perfume_1.webp"
  },
  {
    nombre: "Fresh Blue",
    categoria: "Importado",
    descripcion: "Aroma fresco y moderno",
    precio: "$12.000",
    imagen: "img/perfumes/perfume_2.webp"
  },
  {
    nombre: "Golden Night",
    categoria: "Premium",
    descripcion: "Elegancia para la noche",
    precio: "$15.000",
    imagen: "img/perfumes/perfume_3.webp"
  },
  {
    nombre: "Black Essence",
    categoria: "Premium",
    descripcion: "Aroma intenso y sofisticado",
    precio: "$18.000",
    imagen: "img/perfumes/perfume_4.webp"
  },
  {
    nombre: "Silver Fresh",
    categoria: "Importado",
    descripcion: "Ligero, limpio y moderno",
    precio: "$11.000",
    imagen: "img/perfumes/perfume_5.webp"
  }
];

export function renderizarProductos(listaProductos, contenedor) {
  contenedor.innerHTML = "";

  listaProductos.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <div class="producto__imagen">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>

      <div class="producto__contenido">
        <span class="producto__categoria">${producto.categoria}</span>
        <h3 class="producto__nombre">${producto.nombre}</h3>
        <p class="producto__descripcion">${producto.descripcion}</p>
        <p class="producto__precio">${producto.precio}</p>

        <a 
          href="#"
          class="producto__boton"
          data-nombre="${producto.nombre}"
          data-precio="${producto.precio}"
        >
          Agregar a reserva
        </a>
      </div>
    `;

    contenedor.appendChild(card);
  });
}