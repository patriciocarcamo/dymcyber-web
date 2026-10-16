// Menú en celular: abre y cierra la lista al tocar el botón ☰
const botonMenu = document.querySelector(".menu__boton-movil");
const menu = document.querySelector(".menu");

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("menu--abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
  });
}

// Si falta el archivo del logo, muestra el nombre en texto
document.querySelectorAll("img[data-logo]").forEach((img) => {
  const usarTexto = () => {
    const texto = document.createElement("span");
    texto.className = "header__logo-texto";
    texto.textContent = "DyM Cyber";
    img.replaceWith(texto);
  };
  if (img.complete && img.naturalWidth === 0) usarTexto();
  else img.addEventListener("error", usarTexto);
});
