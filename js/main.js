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

// Animación al hacer scroll: los bloques aparecen suavemente (se desvanecen
// y suben) cuando entran en pantalla. Para animar otro elemento, agrega su
// clase a esta lista. No se anima si la persona pidió "reducir movimiento"
// en su sistema, y si el JavaScript falla todo se ve igual, sin animación.
const ELEMENTOS_ANIMADOS = [
  ".titulo-seccion", ".intro__texto", ".pilares__item",
  ".servicio", ".estandares__titulo", ".estandares__texto", ".norma",
  ".otriskmap__texto", ".otriskmap__imagen", ".caracteristica", ".ruta__texto", ".linea-tiempo",
  ".servicios-esp__etiqueta", ".tarjeta-esp", ".modelo__texto", ".paso", ".modelo__resultado",
  ".hero-nosotros__texto", ".perfil", ".alianza", ".galeria__tarjeta",
  ".contacto__texto", ".dato", ".red", ".panel-form",
  ".footer__columnas > *",
].join(", ");

// Se espera a que la página termine de armarse (la galería de Nosotros
// la crea js/publicaciones.js, que se carga después de este archivo)
document.addEventListener("DOMContentLoaded", () => {
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducirMovimiento || !("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("animar--visible");
      observador.unobserve(entrada.target); // se anima una sola vez
      // Al terminar, se libera la memoria de la tarjeta gráfica que usaba la animación
      entrada.target.addEventListener("transitionend", () => {
        entrada.target.style.willChange = "auto";
      }, { once: true });
    });
  }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(ELEMENTOS_ANIMADOS).forEach((elemento) => {
    // Los elementos hermanos aparecen uno tras otro (en cascada), máximo 0,48 s de espera
    const posicion = [...elemento.parentElement.children].indexOf(elemento);
    elemento.style.transitionDelay = `${Math.min(posicion, 4) * 0.12}s`;
    elemento.classList.add("animar");
    observador.observe(elemento);
  });
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
