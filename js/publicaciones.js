// =========================================================
//  PUBLICACIONES DE LINKEDIN (galería de la página Nosotros)
// =========================================================
//
//  CÓMO AGREGAR UNA PUBLICACIÓN NUEVA
//  1. Guarda la foto en la carpeta "imagenes/".
//     Ejemplo: imagenes/nos-evento-6.jpg (sirve .jpg, .png o .webp).
//  2. Copia este bloque y pégalo AL PRINCIPIO de la lista de abajo
//     (la primera de la lista es la que se ve primero):
//
//       {
//         foto: "imagenes/nos-evento-6.jpg",
//         enlace: "https://lnkd.in/...",
//         descripcion: "Qué se ve en la foto",
//       },
//
//  3. Cambia la foto, el enlace de LinkedIn y la descripción. Guarda.
//
//  Reglas para que no se rompa:
//  - Cada dato va entre comillas "..." y termina en coma.
//  - Cada bloque { ... } termina en coma.
//  - La descripción no se ve en la página: la leen los lectores de pantalla
//    (personas ciegas) y Google. Una frase corta basta.
//  - Para sacar una publicación, borra su bloque completo.
//  - Opcional: si en la foto se corta una cabeza, agrega
//      encuadre: "50% 20%",
//    El segundo número mueve la foto: más bajo muestra más arriba.
//
// =========================================================

const PUBLICACIONES = [
  {
    foto: "imagenes/nos-evento-1.webp",
    enlace: "https://lnkd.in/p/dH2SEftA",
    descripcion: "Equipo de DyM Cyber en un evento",
  },
  {
    foto: "imagenes/nos-evento-2.webp",
    enlace: "https://lnkd.in/p/dhtAeTYK",
    descripcion: "Participación de DyM Cyber en un evento",
  },
  {
    foto: "imagenes/nos-evento-3.webp",
    enlace: "https://lnkd.in/p/dyGdd6X3",
    descripcion: "DyM Cyber en un evento de tecnología",
  },
  {
    foto: "imagenes/nos-evento-4.webp",
    enlace: "https://lnkd.in/p/dVhNFew8",
    descripcion: "DyM Cyber en el Tech Stage de un evento de ciberseguridad",
  },
  {
    foto: "imagenes/nos-evento-5.webp",
    enlace: "https://lnkd.in/p/daFXiaQf",
    descripcion: "DyM Cyber en el plenario de una conferencia",
    encuadre: "50% 37%",
  },
];

// ---------------------------------------------------------
//  De aquí para abajo no hace falta tocar nada.
//  Arma una tarjeta por cada publicación de la lista.
// ---------------------------------------------------------
const galeria = document.querySelector("[data-publicaciones]");

if (galeria) {
  galeria.replaceChildren(...PUBLICACIONES.map((pub) => {
    const tarjeta = document.createElement("li");
    tarjeta.className = "galeria__tarjeta";

    const foto = document.createElement("img");
    foto.src = pub.foto;
    foto.alt = pub.descripcion || "";
    foto.loading = "lazy";
    if (pub.encuadre) foto.style.objectPosition = pub.encuadre;

    const boton = document.createElement("a");
    boton.href = pub.enlace;
    boton.className = "boton-mini boton-mini--naranja";
    boton.target = "_blank";
    boton.rel = "noopener";
    boton.textContent = "Conocer más →";

    tarjeta.append(foto, boton);
    return tarjeta;
  }));
}
