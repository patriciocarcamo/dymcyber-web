# Pendientes para publicar la web de DyM Cyber

Lista de lo que falta resolver antes de subir el sitio. Marcar con [x] lo que se vaya cerrando.

## 1. Definir con el equipo (Nayareth)
- [ ] Dónde se publica y quién sube el sitio (dymcyber.com hoy está en Cloudflare).
- [ ] Si la web lleva versión en inglés.
- [ ] Si OTRiskMap es una landing, la plataforma o ambas. Confirmar que existe otriskmap.com (el botón "Conocer más →" de Servicios OT lleva ahí).

## 2. Formulario de Contacto
- [ ] Hoy envía con FormSubmit (formsubmit.co) al correo de prueba pcarcamo186@gmail.com (constante `CORREO_FORMULARIO` en js/main.js). Al publicar, cambiarlo al correo de la empresa: **dismilka@dymcyber.com** (confirmado por el equipo).
- [ ] Activar dismilka@dymcyber.com: al primer envío le llega un correo de FormSubmit con "Activate Form"; Dismilka tiene que hacer clic.
- [ ] Después de activar, reemplazar el correo en js/main.js por el código alias que da FormSubmit, para que no quede visible en el código.
- [ ] Activar de nuevo en el dominio real después de publicar.
- [ ] Los correos llegan a spam en Gmail. Solución definitiva: enviar desde el dominio de la empresa (p. ej. formulario@dymcyber.com) con SPF y DKIM verificados. Coordinar con quien administre el dominio en Cloudflare.
- [ ] El aviso "¡Solicitud recibida!" solo debe quedar si el envío funciona de verdad.

## 3. Datos reales
- [ ] Teléfono: en Contacto está +56 9 5379 2691 (viene del Figma). Confirmar.
- [x] Dirección: "Colina, Región Metropolitana, Chile" en Contacto y en el footer de todas las páginas.
- [ ] Logo limpio. El actual (imagenes/logo.png) trae borde transparente; al cambiarlo, quitar las compensaciones en css/estilos.css (`padding` 39px del header y `margin-left: -17px` del logo del footer).
- [ ] Redes sociales de DyM:
  - Facebook listo: facebook.com/people/DyM-cyber-TI/61595454421816 (footer y Contacto).
  - Instagram de DyM: pendiente, falta la cuenta. Hoy dice solo "Instagram" sin enlace, en el footer y en Contacto (se quitó @ciber_ot, que no es de DyM).
  - LinkedIn listo: linkedin.com/company/dymti en Contacto y en el footer.
- [x] Nosotros, galería de eventos: las 5 tarjetas enlazan a sus publicaciones de LinkedIn.
- [ ] Footer: confirmar "© 2026 Grupo Ciber OT" y si el menú lleva "Industrias" (está en el footer del Figma, pero no hay página).

## 4. Decisiones de diseño (actualizar el Figma o el código)
- [ ] Colores fuera de la paleta "Colores DyM", hoy como variables en css/estilos.css:
  - Botones del hero rojos (`--boton-cta` #DA3629 / #B92D22) en vez del naranja del componente Botón.
  - `--acento-celeste` #80B1EA, `--acento-rojo` #E8123A, `--fondo-contacto` #02182D, `--rojo-contacto` #B61002.
- [ ] Fuentes mezcladas: Inter (menú, botones del hero, pasos, aviso) y Plus Jakarta Sans (resto).
- [ ] Títulos de 32, 40 y 48 px.
- [ ] Cambios del código que no están en el Figma:
  - Márgenes de 63 px en todas las secciones y columna máxima de 1720 px.
  - Footer agregado en Servicios Especializados, Nosotros y Contacto.
  - Foto de Dismilka con fondo degradado y encuadre completo.
- [ ] En Figma, los íconos sol e intercambio de Servicios Especializados están sueltos fuera del frame: moverlos a sus tarjetas.

## 5. Técnico
- [x] Optimizar imágenes: pasadas a WebP y achicadas a ~2 veces su tamaño en pantalla (de 23 MB a 1,6 MB). Solo logo.png sigue en PNG hasta tener el logo limpio.
- [x] Revisar la versión celular página por página (390 px revisado y corregido; menú ☰ probado en el celular).
- [x] Revisar la versión tablet (768 px).
- [x] Probar el brillo del fondo de Contacto en Chrome y Edge (funciona). En Firefox y Safari queda la imagen fija.
- [x] Agregar favicon: "DyM" rojo sobre cuadrado Azul Header (favicon.ico, imagenes/favicon.png y imagenes/apple-touch-icon.png). Rehacerlo cuando llegue el logo limpio.
- [ ] Revisar que todos los enlaces funcionen antes de subir.
