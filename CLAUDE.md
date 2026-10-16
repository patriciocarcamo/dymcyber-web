# Proyecto: nueva web de DyM Cyber

Contexto para Claude Code. Resume lo trabajado en Figma y lo decidido con el equipo.

## Quién y qué
- Práctica UX/UI en DyM Cyber / Grupo Ciber OT. Responde y explica en español, paso a paso.
- **No modificar nada sin pedir permiso.** En Figma, por ahora solo se puede tocar la página **Componentes**.
- Orden de trabajo:
  1. Terminar el diseño de DyM en Figma.
  2. Programar el sitio de DyM **desde cero** (HTML + CSS + JS). Entrega antes del **1 de noviembre de 2026**.
  3. Diseñar después la web de **OTRiskMap**, que es completamente nueva (alrededor del 8 de noviembre).
- **grupociberot.com** es solo una referencia de *funcionamiento*: navegación, menú, hover, formulario. No es referencia de colores ni fuentes; eso lo define el Figma.
- dymcyber.com (el sitio actual) es una sola página en HTML con Cloudflare. Su contenido se puede reutilizar para llenar las páginas nuevas.

## Figma
- Archivo "DyM", fileKey `S0GUxlEU5Lq3G5PC5iGB4K`
  (https://www.figma.com/design/S0GUxlEU5Lq3G5PC5iGB4K/DyM)
- Páginas: Wireframes Alta (diseño final: 01 - Inicio, 02 - Nosotros, 03- Soluciones, 04 - Servicios, 05 - Industrias, 06 - Marco Regulatorio, 07- Contacto), Wireframes baja, UI KIT, Componentes.
- Ancho de diseño: 1512 px, solo escritorio. Falta la versión celular.

### Variables (colección "Colores DyM")
| Variable | Hex |
|---|---|
| Marca/Navy | #101A33 |
| Marca/Azul Oscuro | #18305D |
| Marca/Azul | #2B5AA6 |
| Marca/Azul Header | #1A5490 |
| Marca/Verde | #5EA267 |
| Marca/Naranja | #EC6621 |
| Marca/Naranja Hover | #D4561A |
| Fondo/Blanco | #FFFFFF |
| Fondo/Claro | #F0F5FF |
| Fondo/Celeste | #BAE0FF |
| Texto/Principal | #101A33 |
| Texto/Secundario | #18305D |
| Borde/Default | #F0F5FF |
| Estado/Error | #B3261E |

### Estilos de texto (Plus Jakarta Sans, line-height 140 %, el H1 120 %)
Titulo/H1 Bold 40 · Etiqueta SemiBold 20 · Cuerpo/Grande Regular 20 · Cuerpo/Medio Regular 16 · Cuerpo/Base Regular 14 · Tarjeta/Titulo SemiBold 14 · Boton SemiBold 16 · Link SemiBold 13 · Pequeño Regular 12

### Componentes (página Componentes, en secciones)
- **Fundamentos:** Paleta de Colores.
- **Básicos:**
  - Botón: Tipo Primario / Hover / Secundario, Tamaño Normal (166x46, padding 12/24, radio 8) / Pequeño (128x34, padding 8/16, radio 6). Propiedad Etiqueta.
  - Input: Estado Normal (borde Marca/Azul 1 px) / Foco (Marca/Naranja 2 px) / Error (Estado/Error 2 px). 324x54, padding 16, radio 8.
  - Item menu: Estado Normal / Activo (borde naranja), Fondo Claro (texto azul) / Oscuro (texto blanco). Padding 16/8.
- **Bloques:**
  - Título de sección: Etiqueta naranja + H1 + descripción opcional.
  - Tarjeta servicio: 441 px, ícono en círculo celeste, título naranja y descripción.
- **Secciones:**
  - Header: 1512x120, fondo Marca/Azul Header, logo a la izquierda y 7 ítems del menú.
  - Footer: propuesta. Fondo Navy, con columnas Navegación, Contacto y Síguenos, más copyright.
- **Por revisar:** un "Button" externo del kit Simple Design System. Se borra cuando se confirme con quien lo agregó.

### Inconsistencias detectadas en el diseño
- Mezcla de 3 fuentes: Plus Jakarta Sans, Inter en el menú y los botones, Open Sans en los inputs.
- Títulos de 36, 40 y 48 px.
- La etiqueta "UN HOLDING…" está en azul y las demás en naranja.
- Los botones del hero son rojos (#B92D22) y el resto naranjos.
- Teléfono de ejemplo.
- El botón OTRISKMAPS "Conocer más" lleva a Contacto.
- La dirección no coincide entre versiones: Colina o Av. del Valle Sur 570, Huechuraba.

## Plan del sitio
```
dymcyber/
  index.html, nosotros.html, servicios.html, soluciones.html,
  industrias.html, marco-regulatorio.html, contacto.html
  css/estilos.css   (variables :root = variables de Figma; componentes)
  js/main.js        (menú celular, formulario)
  imagenes/         (exportadas de Figma, SVG/WebP)
```
- Pasos: base (estilos.css + Header + Footer), luego una página por vez en el orden del Figma, después el comportamiento imitando grupociberot.com, luego la versión celular y al final la publicación.
- Propuestas para la página Contacto: datos de contacto en tarjetas 2x2, un mapa de Google bajo las tarjetas y un formulario más ancho con campo Teléfono.

## Pendiente con el equipo (Nayareth)
- Dónde se publica y quién sube el sitio.
- Cómo debe enviar el formulario y a qué correo.
- Datos reales: teléfono, dirección y logo limpio.
- Si la web lleva versión en inglés.
- Si OTRiskMap es una landing, la plataforma o ambas.
