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
// (estado Error del componente Input). Si todo está bien, envía los datos
// con FormSubmit (formsubmit.co), que los reenvía por correo, y muestra el
// aviso "¡Solicitud recibida!".
// CORREO DE PRUEBA: cambiarlo por el de la empresa cuando el equipo lo confirme.
// La primera vez que se use un correo, FormSubmit manda un mensaje de
// activación a ese correo; hay que hacer clic en "Activate Form".
const CORREO_FORMULARIO = "pcarcamo186@gmail.com";
const form = document.querySelector("#form-contacto");
const estado = document.querySelector("#form-estado");
const aviso = document.querySelector("#aviso-enviado");

if (aviso) {
  aviso.querySelector(".aviso__cerrar").addEventListener("click", () => aviso.close());
}

if (form && estado) {
  const casilla = document.querySelector('input[name="consentimiento"]');

  form.querySelectorAll(".input").forEach((campo) => {
    campo.addEventListener("input", () => campo.classList.remove("input--error"));
  });

  form.addEventListener("submit", async (evento) => {
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
    const boton = form.querySelector(".form__enviar");
    const textoBoton = boton.textContent;
    boton.disabled = true;
    boton.textContent = "Enviando…";
    estado.textContent = "";

    try {
      const datos = Object.fromEntries(new FormData(form));
      const respuesta = await fetch(`https://formsubmit.co/ajax/${CORREO_FORMULARIO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...datos,
          _subject: "Nuevo mensaje desde el sitio web de DyM Cyber",
          _template: "table",
        }),
      });
      const resultado = await respuesta.json();

      if (resultado.success === "true" || resultado.success === true) {
        form.reset();
        if (casilla) casilla.checked = false;
        if (aviso) {
          aviso.showModal();
          aviso.focus(); // el foco queda en el aviso y no en la ×
        }
      } else {
        // Por ejemplo, la primera vez: FormSubmit pide activar el correo
        estado.textContent = resultado.message || "No se pudo enviar el mensaje. Intente de nuevo.";
      }
    } catch {
      estado.textContent = "No se pudo enviar el mensaje. Revise su conexión e intente de nuevo.";
    } finally {
      boton.disabled = false;
      boton.textContent = textoBoton;
    }
  });
}
