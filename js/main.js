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

// Formulario de contacto: revisa los campos y marca los que tienen error
// (estado Error del componente Input). Falta definir con el equipo
// cómo se envía y a qué correo; por ahora solo valida.
const form = document.querySelector("#form-contacto");
const estado = document.querySelector("#form-estado");

if (form && estado) {
  const casilla = document.querySelector('input[name="consentimiento"]');

  form.querySelectorAll(".input").forEach((campo) => {
    campo.addEventListener("input", () => campo.classList.remove("input--error"));
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let valido = true;

    form.querySelectorAll(".input").forEach((campo) => {
      const conError = !campo.checkValidity();
      campo.classList.toggle("input--error", conError);
      if (conError) valido = false;
    });

    if (!valido) {
      estado.textContent = "Revise los campos marcados en rojo.";
      form.querySelector(".input--error").focus();
      return;
    }
    if (casilla && !casilla.checked) {
      estado.textContent = "Debe aceptar el uso de sus datos para enviar el formulario.";
      casilla.focus();
      return;
    }
    estado.textContent = "El envío del formulario aún no está configurado.";
  });
}
