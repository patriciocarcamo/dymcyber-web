// Fondo de Contacto: efecto "Hover neon glow" del Figma.
// El mapa (al 20 % de opacidad) brilla en azul alrededor del mouse.
// Usa el mismo shader WGSL y los mismos parámetros que el Figma.
// Necesita WebGPU (Chrome y Edge recientes). Si el navegador no lo tiene,
// se queda la imagen fija de fondo y la página funciona igual.

// Parámetros copiados del Figma (06 - Contacto, capa "mbdym1")
const PARAMETROS = {
  glowColor: { r: 0.02, g: 0.44466665387153625, b: 1, a: 1 },
  glowSpread: 5.5,
  hoverRadius: 12,
  glowIntensity: 6,
  edgeSoftness: 0.78,
};
const OPACIDAD_IMAGEN = 0.2;

// Shader del Figma, sin cambios
const WGSL = `
diagnostic(off,derivative_uniformity);
struct Uniforms {
  frameData: vec4f,
  inputDimsData: vec4f,
  mouseData: vec4f,
  glowColor: vec4f,
  glowIntensity: vec4f,
  glowSpread: vec4f,
  hoverRadius: vec4f,
  edgeSoftness: vec4f,
};
@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var inputTex: texture_2d<f32>;

struct VsIn {
  @location(0) pos: vec2f,
  @location(1) uv: vec2f,
};
struct VsOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

fn sampleInput(p: vec2f) -> vec4f {
  return textureSampleLevel(inputTex, samp, clamp(p, vec2f(0.0), vec2f(1.0)), 0.0);
}

fn sampleInputOrZero(p: vec2f) -> vec4f {
  let inside = step(vec2f(0.0), p) * step(p, vec2f(1.0));
  return sampleInput(p) * (inside.x * inside.y);
}

@vertex fn vs_main(in: VsIn) -> VsOut {
  var out: VsOut;
  out.position = vec4f(in.pos, 0.0, 1.0);
  out.uv = in.uv;
  return out;
}

@fragment fn fs_main(@location(0) outputUv_in: vec2f) -> @location(0) vec4f {
  let time = u.frameData.x;
  let outputUv = outputUv_in;
  let dims = max(u.frameData.yz, vec2f(1.0));
  let inputDims = max(u.inputDimsData.xy, vec2f(1.0));
  let inputTexel = vec2f(1.0) / inputDims;
  let uv = outputUv;
  let texel = inputTexel;
  let aspect = inputDims.x / max(inputDims.y, 1.0);
  let mousePx = u.mouseData.xy;
  let mouse = u.mouseData.zw;
  let glowColor = u.glowColor;
  let glowIntensity = u.glowIntensity.x;
  let glowSpread = u.glowSpread.x;
  let hoverRadius = u.hoverRadius.x;
  let edgeSoftness = u.edgeSoftness.x;
  let inputColor = sampleInput(uv);
  let shortSide = min(dims.x, dims.y);
  let pixelPos = uv * dims;
  let radiusPx = max(hoverRadius * shortSide * 0.01, 1.0);
  let cursorDistance = length(pixelPos - mousePx);
  let localMask = 1.0 - smoothstep(radiusPx * (1.0 - edgeSoftness), radiusPx, cursorDistance);
  let inBounds = mousePx.x >= 0.0 && mousePx.y >= 0.0 && mousePx.x < dims.x && mousePx.y < dims.y;
  let hoverMask = localMask * select(0.0, 1.0, inBounds);
  let spreadPx = glowSpread * shortSide * 0.01;
  var emission = 0.0;
  var totalWeight = 0.0;
  for (var i = 0; i < 64; i = i + 1) {
    let fi = f32(i);
    let radial = sqrt((fi + 0.5) / 64.0);
    let angle = fi * 2.39996323;
    let offsetPx = vec2f(cos(angle), sin(angle)) * radial * spreadPx;
    let tap = sampleInputOrZero((pixelPos + offsetPx) / dims);
    let peak = max(max(tap.r, tap.g), tap.b);
    let light = max(peak - 0.025 * tap.a, 0.0);
    let weight = exp(-3.5 * radial * radial);
    emission = emission + light * weight;
    totalWeight = totalWeight + weight;
  }
  let haloEnergy = emission / max(totalWeight, 0.0001) * glowIntensity * glowColor.a * hoverMask;
  let haloOpacity = 1.0 - exp(-haloEnergy);
  let haloRgb = clamp(glowColor.rgb, vec3f(0.0), vec3f(1.0)) * haloOpacity;
  let resultRgb = inputColor.rgb + haloRgb * (vec3f(1.0) - inputColor.rgb);
  let resultAlpha = inputColor.a + haloOpacity * (1.0 - inputColor.a);
  return vec4f(resultRgb, resultAlpha);
}
`;

// Dibuja la imagen cubriendo todo el lienzo (como object-fit: cover)
function dibujarCubriendo(ctx, img, ancho, alto) {
  const escala = Math.max(ancho / img.naturalWidth, alto / img.naturalHeight);
  const w = img.naturalWidth * escala;
  const h = img.naturalHeight * escala;
  ctx.drawImage(img, (ancho - w) / 2, (alto - h) / 2, w, h);
}

async function iniciarBrillo() {
  const lienzo = document.querySelector("[data-brillo]");
  if (!lienzo || !navigator.gpu) return;

  const adaptador = await navigator.gpu.requestAdapter();
  if (!adaptador) return;
  const device = await adaptador.requestDevice();
  const contexto = lienzo.getContext("webgpu");
  const formato = navigator.gpu.getPreferredCanvasFormat();
  contexto.configure({ device, format: formato, alphaMode: "premultiplied" });

  const img = new Image();
  img.src = lienzo.dataset.brillo;
  await img.decode();

  // Recursos fijos (mismo setup que el Figma)
  const modulo = device.createShaderModule({ code: WGSL });
  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: modulo,
      entryPoint: "vs_main",
      buffers: [{
        arrayStride: 16,
        attributes: [
          { shaderLocation: 0, format: "float32x2", offset: 0 },
          { shaderLocation: 1, format: "float32x2", offset: 8 },
        ],
      }],
    },
    fragment: { module: modulo, entryPoint: "fs_main", targets: [{ format: formato }] },
    primitive: { topology: "triangle-list" },
  });
  const cuadro = device.createBuffer({ size: 6 * 4 * 4, usage: GPUBufferUsage.VERTEX, mappedAtCreation: true });
  new Float32Array(cuadro.getMappedRange()).set([
    -1, -1, 0, 1,
    1, -1, 1, 1,
    -1, 1, 0, 0,
    -1, 1, 0, 0,
    1, -1, 1, 1,
    1, 1, 1, 0,
  ]);
  cuadro.unmap();
  const uniformes = device.createBuffer({ size: 128, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  const muestreo = device.createSampler({
    magFilter: "linear", minFilter: "linear",
    addressModeU: "clamp-to-edge", addressModeV: "clamp-to-edge",
  });

  let textura = null;
  let grupo = null;
  let mouse = { x: -1, y: -1 };
  let pendiente = false;

  // La textura de entrada es la imagen al 20 %, del tamaño del lienzo
  function prepararTextura() {
    const escala = Math.min(window.devicePixelRatio || 1, 2);
    const ancho = Math.max(1, Math.round(lienzo.clientWidth * escala));
    const alto = Math.max(1, Math.round(lienzo.clientHeight * escala));
    lienzo.width = ancho;
    lienzo.height = alto;

    const auxiliar = document.createElement("canvas");
    auxiliar.width = ancho;
    auxiliar.height = alto;
    const ctx2d = auxiliar.getContext("2d");
    ctx2d.globalAlpha = OPACIDAD_IMAGEN;
    dibujarCubriendo(ctx2d, img, ancho, alto);

    if (textura) textura.destroy();
    textura = device.createTexture({
      size: [ancho, alto],
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });
    device.queue.copyExternalImageToTexture({ source: auxiliar }, { texture: textura, premultipliedAlpha: true }, [ancho, alto]);
    grupo = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: uniformes } },
        { binding: 1, resource: muestreo },
        { binding: 2, resource: textura.createView() },
      ],
    });
  }

  function dibujar() {
    pendiente = false;
    const w = lienzo.width;
    const h = lienzo.height;
    const p = PARAMETROS;
    device.queue.writeBuffer(uniformes, 0, new Float32Array([
      0, w, h, 0,
      w, h, 0, 0,
      mouse.x, mouse.y, mouse.x / w, mouse.y / h,
      p.glowColor.r, p.glowColor.g, p.glowColor.b, p.glowColor.a,
      p.glowIntensity, 0, 0, 0,
      p.glowSpread, 0, 0, 0,
      p.hoverRadius, 0, 0, 0,
      p.edgeSoftness, 0, 0, 0,
    ]));
    const codificador = device.createCommandEncoder();
    const pasada = codificador.beginRenderPass({
      colorAttachments: [{
        view: contexto.getCurrentTexture().createView(),
        loadOp: "clear",
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        storeOp: "store",
      }],
    });
    pasada.setPipeline(pipeline);
    pasada.setBindGroup(0, grupo);
    pasada.setVertexBuffer(0, cuadro);
    pasada.draw(6);
    pasada.end();
    device.queue.submit([codificador.finish()]);
  }

  function pedirDibujo() {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(dibujar);
    }
  }

  // El mouse se escucha en toda la sección porque el contenido queda encima del lienzo
  const seccion = lienzo.parentElement;
  seccion.addEventListener("pointermove", (evento) => {
    const caja = lienzo.getBoundingClientRect();
    const escala = lienzo.width / caja.width;
    mouse = { x: (evento.clientX - caja.left) * escala, y: (evento.clientY - caja.top) * escala };
    pedirDibujo();
  });
  seccion.addEventListener("pointerleave", () => {
    mouse = { x: -1, y: -1 };
    pedirDibujo();
  });
  new ResizeObserver(() => {
    prepararTextura();
    pedirDibujo();
  }).observe(lienzo);

  prepararTextura();
  dibujar();
  // Ya funciona el lienzo: se oculta la imagen fija de respaldo
  seccion.classList.add("contacto--brillo");
}

iniciarBrillo().catch(() => {
  // Si algo falla, queda la imagen fija de fondo
});
