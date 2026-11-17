/* =========================================================
   BLOTTA – main.js
   Todo el comportamiento del sitio (sin frameworks).
   Cada bloque se activa solo si su sección existe en la página,
   así el mismo archivo sirve para index, foro y trabajá con nosotros.
   ========================================================= */

/* ---------- 1. Constantes para reemplazar ---------- */

// WhatsApp de Blotta (formato internacional, sin + ni espacios). Fuente: blotta.com.ar
const WHATSAPP_NUMERO = '5493415149132';
const WHATSAPP_MENSAJE = 'Hola Blotta, quiero hacer una consulta sobre sus máquinas.';

// Email de Recursos Humanos para las búsquedas laborales
const EMAIL_RRHH = 'blottaindustriasrrhh@gmail.com';

/* ---------- 2. Datos del catálogo ----------
   Fuente: catálogo oficial de blotta.com.ar (textos reescritos, datos técnicos reales).
   - categoria: 'masa' | 'conformado' | 'final' (orden del proceso de producción)
   - destacada: true = tarjeta ancha (el producto estrella)
   - imagen / ancho / alto: foto real en assets/fotos. encuadre: qué parte de la foto
     se ve en la tarjeta (object-position).
   - video: ID de YouTube (lo que va después de "v=" en el link). Vacío = sin video. */
const MAQUINAS = [
  {
    id: 'conformadora',
    nombre: 'Conformadoras de empanadas',
    categoria: 'conformado',
    destacada: true,
    icono: 'settings-2',
    imagen: 'assets/fotos/conformadora.jpg', ancho: 1200, alto: 500, encuadre: '62% 60%',
    video: '',
    descripcion: 'Dosifican el relleno, doblan, estampan y cortan cada empanada a partir de una lámina de masa.',
    detalle: 'Trabajan directo sobre la lámina, sin cortar discos antes: calibran la masa, la cortan a lo ancho, dosifican el relleno, doblan, estampan y cortan. Son modulares, así que se adaptan al nivel de automatización y producción de cada planta. Cabezales cambiables para distintos tamaños y formas.',
    caracteristicas: ['No necesitan discos precortados', 'Cabezales cambiables para distintos tamaños y formas', 'Tolvas para dosificar el relleno', 'Comandos manuales y automáticos por PLC', 'Acero inoxidable y parada de emergencia'],
    specs: { 'Modelos': 'MCE1 (mediana) · MCE2 (alta producción)', 'Producción': '2.000 a 4.000 empanadas/h', 'Alimentación': 'Trifásica' }
  },
  {
    id: 'mezcladora',
    nombre: 'Mezcladoras',
    categoria: 'masa',
    icono: 'blend',
    imagen: 'assets/fotos/mezcladora.jpg', ancho: 1200, alto: 407, encuadre: '50% 50%',
    video: '',
    descripcion: 'Preparan la masa con dosificación automática de harina y agua.',
    detalle: 'El primer paso de la producción. Dosifican la harina o premezcla con tolva volumétrica y el agua con bomba peristáltica, y controlan el tiempo de mezclado de forma automática. Hay modelos desde 25 kg hasta 1.500 kg de masa por hora.',
    caracteristicas: ['Tiempo de mezclado regulado automáticamente', 'Bomba peristáltica para dosificar el agua', 'Tolva volumétrica para harina o premezcla', 'Panel de comandos con pantalla táctil', 'Descarga manual, hidráulica o por compuerta neumática según modelo'],
    specs: { 'Modelos': 'M25 · M70 · M210 · M280 · MZ1500', 'Producción': 'Hasta 1.500 kg/h', 'Alimentación': 'Trifásica' }
  },
  {
    id: 'formador-hoja',
    nombre: 'Formadores de hoja',
    categoria: 'masa',
    icono: 'layers',
    imagen: 'assets/fotos/formador-hoja.jpg', ancho: 1200, alto: 402, encuadre: '45% 50%',
    video: '',
    descripcion: 'Forman una lámina de masa lisa y pareja a partir de grumos o recortes.',
    detalle: 'La masa fresca o los recortes se descargan en la tolva y salen como una hoja de 600 mm de ancho, con las dos caras lisas y la misma tensión. Una cuchilla corta las láminas al largo que necesites.',
    caracteristicas: ['Aprovecha los recortes de masa', 'Dos pares de cilindros de 270 mm con terminación blasting mate', 'Volcador automático para cargar la masa', 'Comandos manuales y automáticos por PLC'],
    specs: { 'Modelos': 'FH200 · FH600', 'Producción': '800 a 3.600 kg/h', 'Ancho de lámina': '600 mm' }
  },
  {
    id: 'cruzador',
    nombre: 'Cruzadores de masa',
    categoria: 'masa',
    icono: 'shuffle',
    imagen: 'assets/fotos/cruzador.jpg', ancho: 674, alto: 237, encuadre: '50% 50%',
    video: '',
    descripcion: 'Cruzan la masa dos veces para darle mejor liga y elasticidad.',
    detalle: 'Cinco módulos con tres calibradores, seis cintas transportadoras y dos carritos de vaivén que cruzan la masa dos veces. Cada módulo tiene su propio tablero y velocidades independientes.',
    caracteristicas: ['Doble cruce de masa', 'Velocidades variables e independientes', 'Tablero individual por módulo', 'Parada de emergencia'],
    specs: { 'Ancho de masa': '600 mm', 'Calibradores': '3 de 100 mm de diámetro', 'Alimentación': 'Trifásica' }
  },
  {
    id: 'laminacion',
    nombre: 'Módulos de laminación',
    categoria: 'masa',
    icono: 'gallery-horizontal',
    imagen: 'assets/fotos/laminacion.jpg', ancho: 1200, alto: 406, encuadre: '45% 40%',
    video: '',
    descripcion: 'Laminan la masa al espesor exacto. Se combinan para armar un tren de laminado.',
    detalle: 'Rodillos revestidos en cromo duro que abren y cierran de 0 a 45 mm. Espesor y velocidades se programan por PLC y se ven en pantalla. Varios módulos se unen con cintas sanitarias para formar un tren de laminado completo.',
    caracteristicas: ['Espesor y velocidad programables', 'Rodillos de 180 o 400 mm en cromo duro', 'Cobertura de acero inoxidable', 'Se conectan entre sí para formar un tren de laminado'],
    specs: { 'Modelos': 'EL 180 · TLC400', 'Ancho de trabajo': '600 mm', 'Apertura de rodillos': '0 a 45 mm' }
  },
  {
    id: 'harinador',
    nombre: 'Harinadores',
    categoria: 'masa',
    icono: 'wheat',
    imagen: 'assets/fotos/harinador.jpg', ancho: 1200, alto: 400, encuadre: '67% 50%',
    video: '',
    descripcion: 'Espolvorean harina de forma pareja y automática. Ahorran harina y cuidan al operario.',
    detalle: 'Se montan sobre sobadoras, laminadoras o trenes de laminado y se pueden pasar de una máquina a otra. Evitan las nubes de harina en la planta y que el operario tenga que emparejarla a mano cerca de los rodillos.',
    caracteristicas: ['Aplicación homogénea y constante', 'Menos harina desperdiciada', 'Sin nubes de harina en el ambiente', 'Desmontable y trasladable'],
    specs: { 'Versiones': '3 modelos', 'Se monta en': 'Sobadoras y laminadoras' }
  },
  {
    id: 'cortadora',
    nombre: 'Cortadoras de tapas',
    categoria: 'conformado',
    icono: 'disc-3',
    imagen: 'assets/fotos/cortadora.jpg', ancho: 1200, alto: 460, encuadre: '35% 50%',
    video: 'DWAtu0D1YCU',
    descripcion: 'Cortan discos para empanadas y tartas y los apilan con su separador.',
    detalle: 'El invento de Claudio Blotta: cuchillas rotativas cortan cada disco con su separador y los apilan en la cantidad que programes. La masa y el film sobrantes se separan solos. Cabezales para diámetros de 80 a 320 mm.',
    caracteristicas: ['Apilado programable con separador', 'Separación automática de masa y film sobrantes', 'Tractor de film para usar separadores más finos y bajar costos', 'Modelo CE1 para pequeños emprendedores'],
    specs: { 'Modelos': 'CE1 · CCS1 · CCS2 · RT', 'Producción': '500 a 4.000 docenas/h', 'Diámetro': '80 a 320 mm' }
  },
  {
    id: 'pesaje',
    nombre: 'Módulo de pesaje',
    categoria: 'final',
    icono: 'scale',
    imagen: 'assets/fotos/pesaje.jpg', ancho: 1200, alto: 406, encuadre: '50% 50%',
    video: '',
    descripcion: 'Controla el peso de cada producto antes de envasar y descarta los que no cumplen.',
    detalle: 'Se coordina con la cortadora y la envasadora. Programás el rango de peso y el módulo saca automáticamente los productos que quedan por encima o por debajo.',
    caracteristicas: ['Rango de peso programable', 'Descarte automático', 'Tres sensores ópticos', 'Comandos por PLC'],
    specs: { 'Cintas': 'Entrada, salida y descarte', 'Se integra con': 'Cortadora y envasadora' }
  },
  {
    id: 'envasadora',
    nombre: 'Envasadora flow pack',
    categoria: 'final',
    icono: 'package',
    imagen: 'assets/fotos/envasadora.jpg', ancho: 1200, alto: 399, encuadre: '60% 50%',
    video: 'DWAtu0D1YCU',
    descripcion: 'Envasa en film y solo funciona cuando detecta producto: no desperdicia film.',
    detalle: 'Un sensor óptico centra cada producto para que coincida con el envase impreso. Después lo sella a lo largo y a lo ancho y lo corta en unidades. Hombros cambiables para envasar distintos productos.',
    caracteristicas: ['Arranca solo cuando hay producto', 'Centrado óptico sobre el envase impreso', 'Pantalla táctil y control por PLC', 'Hombros cambiables'],
    specs: { 'Producción': 'Unos 45 paquetes/min', 'Ancho de producto': '80 a 320 mm', 'Film': 'Polipropileno biorientado' }
  }
];

const CATEGORIAS = {
  masa: 'Preparación de masa',
  conformado: 'Corte y conformado',
  final: 'Pesaje y envasado'
};

/* Países para los formularios: Argentina primero, después América y Europa */
const PAISES = {
  'Argentina': ['Argentina'],
  'América': ['Bolivia', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Estados Unidos', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela'],
  'Europa': ['Alemania', 'Austria', 'Bélgica', 'Dinamarca', 'España', 'Francia', 'Grecia', 'Irlanda', 'Italia', 'Países Bajos', 'Polonia', 'Portugal', 'Reino Unido', 'Suecia', 'Suiza'],
  'Otro': ['Otro país']
};

/* ---------- 3. Utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Dibuja los íconos Lucide pendientes (llamar después de insertar HTML). */
function refrescarIconos() {
  if (window.lucide) window.lucide.createIcons();
}

/** Escapa texto para insertarlo como HTML de forma segura. */
function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function linkWhatsApp(mensaje = WHATSAPP_MENSAJE) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

/** Lleva a una sección; si no existe en esta página, va a index.html#id */
function irASeccion(id) {
  const destino = document.getElementById(id);
  if (destino) destino.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth' });
  else window.location.href = `index.html#${id}`;
}

/* ---------- 4. Header y menú ---------- */
function initHeader() {
  const header = $('#header');
  if (!header) return;
  const actualizar = () => header.classList.toggle('is-solido', window.scrollY > 12);
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });

  const boton = $('#btn-menu');
  const menu = $('#menu-movil');
  if (!boton || !menu) return;

  const cerrar = () => {
    menu.hidden = true;
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
    boton.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    refrescarIconos();
  };
  const abrir = () => {
    menu.hidden = false;
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar menú');
    boton.innerHTML = '<i data-lucide="x" aria-hidden="true"></i>';
    refrescarIconos();
    header.classList.add('is-solido');
  };
  boton.addEventListener('click', () => (menu.hidden ? abrir() : cerrar()));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) cerrar(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { cerrar(); boton.focus(); }
  });
}

/* ---------- 5. Catálogo con filtros ---------- */
function htmlImagen(m, clase = '') {
  if (m.imagen) {
    return `<img class="foto ${clase}" src="${m.imagen}" alt="${escapar(m.nombre)} de Blotta" width="${m.ancho}" height="${m.alto}" style="object-position:${m.encuadre || '50% 50%'}" loading="lazy" decoding="async">`;
  }
  return `<div class="foto ${clase}" role="img" aria-label="Espacio para la foto de ${escapar(m.nombre)}">
            <i data-lucide="${m.icono}" aria-hidden="true"></i>
            <span class="foto__texto">Foto próximamente</span>
          </div>`;
}

function htmlSpecs(specs) {
  return `<dl class="specs">${Object.entries(specs)
    .map(([k, v]) => `<div><dt>${escapar(k)}</dt><dd>${escapar(v)}</dd></div>`)
    .join('')}</dl>`;
}

function initCatalogo() {
  const grilla = $('#grilla-maquinas');
  if (!grilla) return;
  const conteo = $('#conteo');

  const pintar = (filtro) => {
    const lista = filtro === 'todas' ? MAQUINAS : MAQUINAS.filter((m) => m.categoria === filtro);
    grilla.innerHTML = lista.length
      ? lista.map((m, i) => `
        <article class="maquina ${m.destacada ? 'maquina--linea' : ''} reveal" style="--d:${Math.min(i, 5) * 55}ms" aria-labelledby="maq-${m.id}">
          ${htmlImagen(m)}
          <div class="maquina__cuerpo">
            <span class="chip">${CATEGORIAS[m.categoria]}</span>
            <h3 class="maquina__nombre" id="maq-${m.id}">${escapar(m.nombre)}</h3>
            <p class="maquina__desc">${escapar(m.descripcion)}</p>
            ${htmlSpecs(m.specs)}
            <div class="maquina__acciones">
              <button class="btn btn--cta btn--chico" type="button" data-cotizar="${m.id}">Cotizar esta máquina</button>
              <button class="link-detalle" type="button" data-detalle="${m.id}">Ver detalles <i data-lucide="arrow-right" aria-hidden="true"></i></button>
            </div>
          </div>
        </article>`).join('')
      : '<p class="vacio">No hay máquinas en esta categoría por ahora.</p>';

    if (conteo) {
      conteo.textContent = `${lista.length} ${lista.length === 1 ? 'máquina' : 'máquinas'}`;
    }
    refrescarIconos();
    observarReveal(grilla);
  };

  $$('#filtros .filtro').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#filtros .filtro').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      pintar(btn.dataset.filtro);
    });
  });

  // Delegación: botones de cada tarjeta
  grilla.addEventListener('click', (e) => {
    const det = e.target.closest('[data-detalle]');
    const cot = e.target.closest('[data-cotizar]');
    if (det) abrirDetalle(det.dataset.detalle, det);
    if (cot) cotizar(cot.dataset.cotizar);
  });

  pintar('todas');
}

/* ---------- 6. Modal de detalle ---------- */
let disparadorModal = null;

function abrirDetalle(id, disparador) {
  const modal = $('#modal-maquina');
  const m = MAQUINAS.find((x) => x.id === id);
  if (!modal || !m) return;
  disparadorModal = disparador || null;

  // Con video: el video de YouTube. Sin video: la foto real de la máquina.
  const media = m.video
    ? `<h3 style="margin-bottom:10px">Mirá cómo funciona</h3>
       <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.video)}" title="Video: ${escapar(m.nombre)} en funcionamiento" allowfullscreen loading="lazy"></iframe></div>`
    : `<div class="modal__foto">${htmlImagen(m)}</div>`;

  $('#modal-contenido').innerHTML = `
    <div class="modal__grid">
      <div>
        <span class="chip">${CATEGORIAS[m.categoria]}</span>
        <h2 id="modal-titulo" style="margin-top:10px">${escapar(m.nombre)}</h2>
        <p style="margin-top:12px">${escapar(m.detalle)}</p>
        <h3 style="margin-top:20px;margin-bottom:10px">Características</h3>
        <ul class="lista-check">
          ${m.caracteristicas.map((c) => `<li><i data-lucide="check" aria-hidden="true"></i>${escapar(c)}</li>`).join('')}
        </ul>
      </div>
      <div>
        ${media}
        <h3 style="margin-top:20px;margin-bottom:6px">Datos técnicos</h3>
        ${htmlSpecs(m.specs)}
        <p class="nota-ejemplo" style="margin-top:8px"><i data-lucide="info" aria-hidden="true"></i> Valores aproximados: dependen del producto y la configuración.</p>
        <div class="modal__acciones">
          <button class="btn btn--cta" type="button" data-cotizar-modal="${m.id}">Cotizar esta máquina</button>
        </div>
      </div>
    </div>`;
  refrescarIconos();
  modal.showModal();
}

function initModal() {
  const modal = $('#modal-maquina');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    // Clic en el fondo oscuro (fuera del contenido) = cerrar
    if (e.target === modal || e.target.closest('[data-cerrar-modal]')) modal.close();
    const cot = e.target.closest('[data-cotizar-modal]');
    if (cot) { modal.close(); cotizar(cot.dataset.cotizarModal); }
  });
  modal.addEventListener('close', () => {
    if (disparadorModal && document.contains(disparadorModal)) disparadorModal.focus();
  });
}

/** Lleva al formulario de presupuesto con la máquina ya marcada */
function cotizar(id) {
  const check = $(`#pr-maquinas input[value="${id}"]`);
  if (!check) { window.location.href = 'index.html#presupuesto'; return; }
  check.checked = true;
  limpiarError(check.closest('fieldset'));
  actualizarAvisoSeleccion();
  $('#form-presupuesto').scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', block: 'start' });
  setTimeout(() => $('#pr-nombre').focus({ preventScroll: true }), reducirMovimiento ? 0 : 600);
}

/** Muestra arriba del formulario qué máquinas quedaron marcadas */
function actualizarAvisoSeleccion() {
  const aviso = $('#pr-seleccion');
  if (!aviso) return;
  const ids = $$('#pr-maquinas input:checked').map((c) => c.value);
  const nombres = MAQUINAS.filter((m) => ids.includes(m.id)).map((m) => m.nombre);
  aviso.hidden = !nombres.length;
  aviso.innerHTML = nombres.length
    ? `<i data-lucide="circle-check" aria-hidden="true"></i> <span>Vas a cotizar: <strong>${nombres.map(escapar).join(', ')}</strong></span>`
    : '';
  refrescarIconos();
}

/* ---------- 7. Formularios (validación simulada) ---------- */
function llenarOpciones() {
  $$('[data-opciones-paises]').forEach((sel) => {
    Object.entries(PAISES).forEach(([grupo, paises]) => {
      const og = document.createElement('optgroup');
      og.label = grupo;
      paises.forEach((p) => og.append(new Option(p, p)));
      sel.append(og);
    });
  });
  $$('[data-opciones-maquinas]').forEach((sel) => {
    MAQUINAS.forEach((m) => sel.append(new Option(m.nombre, m.id)));
  });
  $$('[data-checks-maquinas]').forEach((cont) => {
    cont.innerHTML = MAQUINAS.map((m) => `
      <label class="chip-check">
        <input type="checkbox" name="maquinas" value="${m.id}">
        <span><i data-lucide="check" aria-hidden="true"></i>${escapar(m.nombre)}</span>
      </label>`).join('');
  });
  // El showroom no puede agendarse para una fecha pasada
  const fecha = $('#sh-fecha');
  if (fecha) fecha.min = new Date().toISOString().split('T')[0];
}

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Devuelve el mensaje de error de un campo, o '' si está bien */
function validarCampo(campo) {
  const valor = (campo.value || '').trim();
  const nombre = campo.name;
  if (campo.required && !valor) {
    if (campo.tagName === 'SELECT') return 'Elegí una opción de la lista.';
    if (campo.type === 'date') return 'Elegí una fecha.';
    return 'Completá este campo.';
  }
  if (campo.type === 'email' && valor && !EMAIL_OK.test(valor)) return 'Revisá el email: falta la @ o el dominio (ej. nombre@empresa.com).';
  if (campo.type === 'tel' && valor && valor.replace(/\D/g, '').length < 8) return 'El número parece incompleto. Incluí código de país y de área.';
  if (campo.type === 'date' && valor && campo.min && valor < campo.min) return 'Elegí una fecha a partir de hoy.';
  if (nombre === 'mensaje' && valor.length < 15) return 'Contanos un poco más (al menos 15 caracteres) para poder asesorarte.';
  return '';
}

function mostrarError(campo, mensaje) {
  const error = document.getElementById(`${campo.id}-error`);
  campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
  if (error) {
    error.textContent = mensaje;
    if (mensaje) campo.setAttribute('aria-describedby', error.id);
  }
}

function limpiarError(fieldset) {
  if (!fieldset) return;
  const error = $('.campo__error', fieldset);
  if (error) error.textContent = '';
}

/**
 * Conecta un formulario: valida al enviar y al salir de cada campo,
 * y muestra el mensaje de éxito. `extra` permite validaciones propias.
 */
function conectarFormulario(form, exito, { extra, alEnviar } = {}) {
  if (!form || !exito) return;
  const campos = $$('input:not([type="checkbox"]), select, textarea', form);

  campos.forEach((c) => {
    c.addEventListener('blur', () => { if (c.value) mostrarError(c, validarCampo(c)); });
    c.addEventListener('input', () => { if (c.getAttribute('aria-invalid') === 'true') mostrarError(c, validarCampo(c)); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let primero = null;
    campos.forEach((c) => {
      const msg = validarCampo(c);
      mostrarError(c, msg);
      if (msg && !primero) primero = c;
    });
    if (extra) {
      const fallo = extra();
      if (fallo && !primero) primero = fallo;
    }
    if (primero) { primero.focus(); return; }

    // Simulamos el envío (estado de carga breve)
    const boton = $('button[type="submit"]', form);
    const textoOriginal = boton.innerHTML;
    boton.disabled = true;
    boton.textContent = 'Enviando…';

    // TODO: conectar con Formspree / EmailJS / backend.
    // Ej. con Formspree: fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
    setTimeout(() => {
      if (alEnviar) alEnviar(new FormData(form));
      form.hidden = true;
      exito.hidden = false;
      exito.focus();
      boton.disabled = false;
      boton.innerHTML = textoOriginal;
      refrescarIconos();
    }, 700);
  });
}

function initFormularios() {
  llenarOpciones();

  conectarFormulario($('#form-showroom'), $('#showroom-exito'));
  conectarFormulario($('#form-ebook'), $('#ebook-exito'));

  const formP = $('#form-presupuesto');
  const exitoP = $('#presupuesto-exito');
  conectarFormulario(formP, exitoP, {
    // Al menos una máquina marcada
    extra: () => {
      const marcadas = $$('#pr-maquinas input:checked');
      const error = $('#pr-maquinas-error');
      if (!marcadas.length) {
        error.textContent = 'Marcá al menos una máquina (podés elegir varias).';
        return $('#pr-maquinas input');
      }
      error.textContent = '';
      return null;
    },
    alEnviar: (datos) => {
      const ids = datos.getAll('maquinas');
      const nombres = MAQUINAS.filter((m) => ids.includes(m.id)).map((m) => m.nombre);
      $('#presupuesto-resumen').textContent = `Pedido para ${datos.get('empresa')}: ${nombres.join(', ')}.`;
    }
  });
  $('#pr-maquinas')?.addEventListener('change', () => { limpiarError($('#pr-maquinas').closest('fieldset')); actualizarAvisoSeleccion(); });

  $('#presupuesto-otro')?.addEventListener('click', () => {
    formP.reset();
    actualizarAvisoSeleccion();
    $$('[aria-invalid]', formP).forEach((c) => c.removeAttribute('aria-invalid'));
    exitoP.hidden = true;
    formP.hidden = false;
    $('#pr-nombre').focus();
  });
}

/* ---------- 8. Contadores animados ---------- */
function initContadores() {
  const numeros = $$('[data-contar]');
  if (!numeros.length) return;

  const animar = (el) => {
    const fin = Number(el.dataset.contar);
    const desde = Number(el.dataset.desde || 0);
    const prefijo = el.dataset.prefijo || '';
    if (reducirMovimiento) { el.textContent = prefijo + fin; return; }
    const duracion = 1400;
    const t0 = performance.now();
    const paso = (t) => {
      const p = Math.min((t - t0) / duracion, 1);
      const suave = 1 - Math.pow(1 - p, 4); // ease-out exponencial
      el.textContent = prefijo + Math.round(desde + (fin - desde) * suave);
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) { animar(en.target); obs.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  numeros.forEach((n) => obs.observe(n));
}

/* ---------- 9. Aparición al hacer scroll ---------- */
let observadorReveal = null;
function observarReveal(ctx = document) {
  const elementos = $$('.reveal:not(.is-visible)', ctx);
  if (!('IntersectionObserver' in window) || reducirMovimiento) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  if (!observadorReveal) {
    observadorReveal = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); observadorReveal.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  elementos.forEach((el) => observadorReveal.observe(el));
}

/* ---------- 10. Elementos flotantes ---------- */
const AVATAR_EMPANADA = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 44a24 24 0 0 1 48 0z" fill="#FEBB56" stroke="#EE9E26" stroke-width="3" stroke-linejoin="round"/><g fill="#EE9E26"><circle cx="11" cy="33" r="3"/><circle cx="17" cy="25" r="3"/><circle cx="25" cy="21" r="3"/><circle cx="32" cy="20" r="3"/><circle cx="39" cy="21" r="3"/><circle cx="47" cy="25" r="3"/><circle cx="53" cy="33" r="3"/></g><circle cx="26" cy="36" r="2.4" fill="#EE9E26"/><circle cx="37" cy="33" r="2" fill="#EE9E26"/></svg>`;

const ICONO_WHATSAPP = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.37 9.37 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.01z"/></svg>`;

function initFlotantes() {
  const cont = document.createElement('div');
  cont.className = 'flotantes';
  cont.innerHTML = `
    <a class="flotante flotante--whatsapp" href="${linkWhatsApp()}" target="_blank" rel="noopener" aria-label="Envianos un mensaje por WhatsApp">
      ${ICONO_WHATSAPP}
      <span class="flotante__tooltip" aria-hidden="true">Envianos un mensaje</span>
    </a>
    <button class="flotante flotante--chat" type="button" id="btn-chat" aria-label="Abrir asistente virtual" aria-expanded="false" aria-controls="chat">
      <i data-lucide="message-circle" aria-hidden="true"></i>
      <span class="punto-online" aria-hidden="true"></span>
      <span class="flotante__tooltip" aria-hidden="true">Asistente 24/7</span>
    </button>`;
  document.body.append(cont);

  const arriba = document.createElement('button');
  arriba.className = 'arriba';
  arriba.type = 'button';
  arriba.setAttribute('aria-label', 'Volver arriba');
  arriba.innerHTML = '<i data-lucide="arrow-up" aria-hidden="true"></i>';
  document.body.append(arriba);
  arriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducirMovimiento ? 'auto' : 'smooth' });
    ($('.header__logo') || document.body).focus?.();
  });
  const mostrarArriba = () => arriba.classList.toggle('is-visible', window.scrollY > 700);
  mostrarArriba();
  window.addEventListener('scroll', mostrarArriba, { passive: true });

  // Todos los links marcados con data-whatsapp usan la constante
  $$('[data-whatsapp]').forEach((a) => {
    a.href = linkWhatsApp();
    a.target = '_blank';
    a.rel = 'noopener';
  });

  initChatbot();
}

/* ---------- 11. Chatbot 24/7 (simulado) ---------- */
const ESTADOS_PEDIDO = [
  'en fabricación 🛠️. Tu equipo está en la etapa de armado.',
  'en control de calidad ✅. Estamos haciendo las pruebas finales.',
  'listo para despacho 📦. Coordinamos la entrega con vos esta semana.',
  'despachado 🚚. Está en viaje a tu planta.'
];

function initChatbot() {
  const chat = document.createElement('section');
  chat.className = 'chat';
  chat.id = 'chat';
  chat.hidden = true;
  chat.setAttribute('aria-label', 'Asistente virtual de Blotta');
  chat.innerHTML = `
    <header class="chat__cabecera">
      <span class="chat__avatar">${AVATAR_EMPANADA}</span>
      <div>
        <div class="chat__titulo">Asistente Blotta</div>
        <div class="chat__estado">En línea 24/7</div>
      </div>
      <button class="chat__cerrar" type="button" aria-label="Cerrar asistente"><i data-lucide="x" aria-hidden="true"></i></button>
    </header>
    <div class="chat__mensajes" id="chat-mensajes" role="log" aria-live="polite"></div>
    <div class="chat__rapidos" role="group" aria-label="Respuestas rápidas">
      <button class="chat__rapido" type="button" data-accion="maquinas">Ver máquinas</button>
      <button class="chat__rapido" type="button" data-accion="presupuesto">Pedir presupuesto</button>
      <button class="chat__rapido" type="button" data-accion="pedido">Estado de mi pedido</button>
      <button class="chat__rapido" type="button" data-accion="soporte">Soporte técnico</button>
      <button class="chat__rapido" type="button" data-accion="persona">Hablar con una persona</button>
    </div>
    <form class="chat__form" autocomplete="off">
      <label class="sr-only" for="chat-input">Escribí tu consulta</label>
      <input id="chat-input" type="text" placeholder="Escribí tu consulta…" maxlength="300">
      <button type="submit" aria-label="Enviar mensaje"><i data-lucide="send" aria-hidden="true"></i></button>
    </form>`;
  document.body.append(chat);

  const btnChat = $('#btn-chat');
  const mensajes = $('#chat-mensajes', chat);
  const input = $('#chat-input', chat);
  let esperandoPedido = false;
  let saludado = false;

  const agregar = (html, quien = 'bot') => {
    const m = document.createElement('div');
    m.className = `msg msg--${quien}`;
    if (quien === 'user') m.textContent = html; else m.innerHTML = html;
    mensajes.append(m);
    mensajes.scrollTop = mensajes.scrollHeight;
  };

  // Respuesta con "escribiendo…" para que se sienta natural
  const responder = (html, demora = 650) => {
    const typing = document.createElement('div');
    typing.className = 'msg msg--bot msg--escribiendo';
    typing.setAttribute('aria-label', 'El asistente está escribiendo');
    typing.innerHTML = '<i></i><i></i><i></i>';
    mensajes.append(typing);
    mensajes.scrollTop = mensajes.scrollHeight;
    setTimeout(() => { typing.remove(); agregar(html); }, reducirMovimiento ? 0 : demora);
  };

  const abrir = () => {
    chat.hidden = false;
    btnChat.setAttribute('aria-expanded', 'true');
    btnChat.setAttribute('aria-label', 'Cerrar asistente virtual');
    if (!saludado) {
      saludado = true;
      agregar('¡Hola! Soy el asistente de Blotta 👋 ¿En qué te ayudo?');
      responder('Podés escribirme o elegir una opción de abajo.', 500);
    }
    setTimeout(() => input.focus(), 50);
  };
  const cerrar = () => {
    chat.hidden = true;
    btnChat.setAttribute('aria-expanded', 'false');
    btnChat.setAttribute('aria-label', 'Abrir asistente virtual');
    btnChat.focus();
  };

  btnChat.addEventListener('click', () => (chat.hidden ? abrir() : cerrar()));
  $('.chat__cerrar', chat).addEventListener('click', cerrar);
  chat.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrar(); });

  // Acciones (botones rápidos y palabras clave comparten la misma lógica)
  const acciones = {
    maquinas() {
      responder(`Tenemos equipos para cada etapa: mezcladoras, formadores de hoja, laminación, conformadoras de empanadas, cortadoras de tapas, pesaje y envasado. Te llevo al catálogo 👇`);
      setTimeout(() => irASeccion('maquinas'), 900);
    },
    presupuesto() {
      responder('¡Genial! Completá el formulario de presupuesto y un especialista te contacta en menos de 48 h hábiles. Te llevo ahí 👇');
      setTimeout(() => irASeccion('presupuesto'), 900);
    },
    pedido() {
      esperandoPedido = true;
      responder('Decime tu número de pedido (por ejemplo: <strong>BL-1234</strong>) y te digo en qué estado está.');
    },
    soporte() {
      responder(`Para soporte técnico contame qué máquina tenés y qué está pasando. Si es urgente, escribile directo a nuestro equipo técnico por <a href="${linkWhatsApp('Hola Blotta, necesito soporte técnico.')}" target="_blank" rel="noopener">WhatsApp</a>.`);
    },
    persona() {
      responder(`¡Claro! Te derivo con una persona de nuestro equipo por WhatsApp: <a href="${linkWhatsApp()}" target="_blank" rel="noopener">abrir chat con Blotta</a>.`);
    },
    showroom() {
      responder('Podés agendar una prueba en nuestro showroom de Rosario y ver las máquinas funcionando. Te llevo al formulario 👇');
      setTimeout(() => irASeccion('showroom'), 900);
    },
    trabajo() {
      responder('¡Qué bueno que quieras sumarte! Mirá las búsquedas activas en <a href="trabaja-con-nosotros.html">Trabajá con nosotros</a>.');
    },
    foro() {
      responder('En el <a href="foro.html">Foro IA Blotta</a> podés consultar y compartir experiencias con otros productores.');
    }
  };

  // Palabras clave → acción (se busca en el texto en minúsculas y sin tildes)
  const CLAVES = [
    [/pedido|envio|entrega|seguimiento|estado/, 'pedido'],
    [/presupuesto|precio|cotiz|costo|cuanto (sale|cuesta)|valor/, 'presupuesto'],
    [/soporte|falla|problema|repuesto|tecnic|service|mantenimiento|arregl/, 'soporte'],
    [/persona|humano|asesor|vendedor|whatsapp|llamar|telefono/, 'persona'],
    [/showroom|visita|prueba|conocer la planta/, 'showroom'],
    [/trabajo|empleo|cv|busqueda|postul/, 'trabajo'],
    [/foro|comunidad/, 'foro'],
    [/maquina|catalogo|linea|lamina|conformadora|cortadora|tapas|mezcla|harin|cruzad|pesaje|envas|flow|equipo/, 'maquinas']
  ];

  const procesar = (texto) => {
    const t = texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    if (esperandoPedido) {
      const num = t.match(/\d{3,}/);
      if (num) {
        esperandoPedido = false;
        const estado = ESTADOS_PEDIDO[Number(num[0]) % ESTADOS_PEDIDO.length];
        responder(`El pedido <strong>BL-${num[0]}</strong> está ${estado}<br><small>(Estado de ejemplo: esta demo no está conectada al sistema de pedidos.)</small>`);
        return;
      }
      responder('No encontré un número en tu mensaje. Escribilo así: <strong>BL-1234</strong>.');
      return;
    }
    if (/^(hola|buenas|buen dia|buenas tardes|hey)/.test(t)) {
      responder('¡Hola! 😊 Puedo mostrarte las máquinas, ayudarte con un presupuesto o con el estado de tu pedido.');
      return;
    }
    if (/gracias/.test(t)) { responder('¡De nada! Si necesitás algo más, acá estoy.'); return; }

    const encontrada = CLAVES.find(([re]) => re.test(t));
    if (encontrada) { acciones[encontrada[1]](); return; }

    responder(`No estoy seguro de haber entendido 🤔. Probá con una de las opciones de abajo o <a href="${linkWhatsApp()}" target="_blank" rel="noopener">hablá con una persona</a>.`);
  };

  $('.chat__rapidos', chat).addEventListener('click', (e) => {
    const b = e.target.closest('[data-accion]');
    if (!b) return;
    agregar(b.textContent, 'user');
    if (b.dataset.accion !== 'pedido') esperandoPedido = false;
    acciones[b.dataset.accion]();
  });

  $('.chat__form', chat).addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;
    agregar(texto, 'user');
    input.value = '';
    procesar(texto);
  });
}

/* ---------- 12. Foro (foro.html) ---------- */
const TEMAS_FORO = [
  { titulo: '¿Cómo calibrar el peso del relleno?', autor: 'Marina G.', pais: 'Argentina', categoria: 'Dosificación', respuestas: 14, ia: true },
  { titulo: 'Mantenimiento de la laminadora: ¿cada cuánto cambiar los rodillos?', autor: 'Jorge P.', pais: 'Uruguay', categoria: 'Mantenimiento', respuestas: 9, ia: true },
  { titulo: 'Pasar de 500 a 3.000 empanadas por día', autor: 'Lucía F.', pais: 'Chile', categoria: 'Escalar la producción', respuestas: 22, ia: false },
  { titulo: 'Masa que se rompe en el laminado: ¿humedad o temperatura?', autor: 'Diego R.', pais: 'Argentina', categoria: 'Recetas y masas', respuestas: 17, ia: true },
  { titulo: 'Exportar empanadas congeladas a Europa: experiencias', autor: 'Ana M.', pais: 'España', categoria: 'Exportación', respuestas: 6, ia: false },
  { titulo: 'Limpieza diaria de la conformadora en 15 minutos', autor: 'Carlos B.', pais: 'Paraguay', categoria: 'Mantenimiento', respuestas: 11, ia: true }
];

function initForo() {
  const lista = $('#lista-temas');
  if (!lista) return;
  const buscador = $('#buscar-tema');
  const categorias = $('#categorias-foro');
  let categoriaActiva = 'Todas';

  const iniciales = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  const pintar = () => {
    const q = (buscador?.value || '').toLowerCase().trim();
    const filtrados = TEMAS_FORO.filter((t) =>
      (categoriaActiva === 'Todas' || t.categoria === categoriaActiva) &&
      (!q || t.titulo.toLowerCase().includes(q) || t.categoria.toLowerCase().includes(q)));
    lista.innerHTML = filtrados.length ? filtrados.map((t, i) => `
      <li class="tema reveal is-visible" style="--d:${i * 40}ms">
        <span class="tema__avatar" aria-hidden="true">${iniciales(t.autor)}</span>
        <div>
          <h2>${escapar(t.titulo)}</h2>
          <div class="tema__meta">
            <span><i data-lucide="user" aria-hidden="true"></i>${escapar(t.autor)} · ${escapar(t.pais)}</span>
            <span><i data-lucide="message-square" aria-hidden="true"></i>${t.respuestas} ${t.respuestas === 1 ? 'respuesta' : 'respuestas'}</span>
          </div>
        </div>
        <div class="tema__extra">
          <span class="chip">${escapar(t.categoria)}</span>
          ${t.ia ? '<span class="chip chip--ia"><i data-lucide="sparkles" aria-hidden="true"></i>Respondido por IA Blotta</span>' : ''}
        </div>
      </li>`).join('')
      : '<li class="vacio">No encontramos temas con esa búsqueda. ¿Por qué no abrís una nueva consulta?</li>';
    refrescarIconos();
  };

  // Chips de categorías
  if (categorias) {
    const cats = ['Todas', ...new Set(TEMAS_FORO.map((t) => t.categoria))];
    categorias.innerHTML = cats.map((c) => `<button class="filtro" type="button" aria-pressed="${c === 'Todas'}">${c}</button>`).join('');
    categorias.addEventListener('click', (e) => {
      const b = e.target.closest('.filtro');
      if (!b) return;
      categoriaActiva = b.textContent;
      $$('.filtro', categorias).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      pintar();
    });
  }
  buscador?.addEventListener('input', pintar);

  // Modal "Nueva consulta"
  const modal = $('#modal-consulta');
  const form = $('#form-consulta');
  const exito = $('#consulta-exito');
  $('#btn-nueva-consulta')?.addEventListener('click', () => {
    form.hidden = false; exito.hidden = true; form.reset();
    $$('[aria-invalid]', form).forEach((c) => c.removeAttribute('aria-invalid'));
    $$('.campo__error', form).forEach((c) => { c.textContent = ''; });
    modal.showModal();
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-cerrar-modal]')) modal.close();
  });
  conectarFormulario(form, exito, {
    alEnviar: (datos) => {
      TEMAS_FORO.unshift({
        titulo: datos.get('titulo'), autor: datos.get('autor') || 'Vos', pais: 'Argentina',
        categoria: datos.get('categoria'), respuestas: 0, ia: false
      });
      categoriaActiva = 'Todas';
      $$('.filtro', categorias).forEach((x) => x.setAttribute('aria-pressed', String(x.textContent === 'Todas')));
      if (buscador) buscador.value = '';
      pintar();
    }
  });

  pintar();
}

/* ---------- 13. Trabajá con nosotros ---------- */
const EMPLEOS = [
  {
    puesto: 'Especialista en marketing digital',
    asunto: 'Especialista marketing digital Blotta',
    icono: 'megaphone',
    modalidad: 'Híbrido · Rosario',
    requisitos: ['Experiencia en campañas de Meta Ads, Google Ads y LinkedIn', 'Manejo de métricas y reportes (Google Analytics)', 'Redacción de contenidos para empresas B2B', 'Deseable: experiencia en industria o exportación']
  },
  {
    puesto: 'Diseñador/a gráfico/a',
    asunto: 'Diseñador Blotta',
    icono: 'pen-tool',
    modalidad: 'Híbrido · Rosario',
    requisitos: ['Dominio de Illustrator, Photoshop y Figma o Canva', 'Portfolio con piezas de marca y redes', 'Diseño de catálogos y fichas técnicas', 'Nociones de edición de video']
  },
  {
    puesto: 'Programador/a junior',
    asunto: 'Programador Junior Blotta',
    icono: 'code-xml',
    modalidad: 'Presencial · Rosario',
    requisitos: ['HTML, CSS y JavaScript', 'Ganas de aprender y trabajar en equipo', 'Deseable: Git y alguna base de datos', 'Estudiante o recién recibido/a']
  }
];

function initEmpleos() {
  const cont = $('#lista-empleos');
  if (!cont) return;
  cont.innerHTML = EMPLEOS.map((e, i) => {
    const mailto = `mailto:${EMAIL_RRHH}?subject=${encodeURIComponent(e.asunto)}&body=${encodeURIComponent('Hola, adjunto mi CV para la búsqueda de ' + e.puesto + '.\n\nNombre:\nTeléfono:\n')}`;
    return `
      <article class="empleo reveal" style="--d:${i * 70}ms">
        <span class="empleo__icono"><i data-lucide="${e.icono}" aria-hidden="true"></i></span>
        <h2>${escapar(e.puesto)}</h2>
        <div class="empleo__meta"><span class="chip"><i data-lucide="map-pin" aria-hidden="true" style="width:14px;height:14px"></i>${escapar(e.modalidad)}</span><span class="chip chip--ia">Búsqueda activa</span></div>
        <ul class="lista-check">
          ${e.requisitos.map((r) => `<li><i data-lucide="check" aria-hidden="true"></i>${escapar(r)}</li>`).join('')}
        </ul>
        <a class="btn btn--cta" href="${mailto}">Enviar CV <i data-lucide="send" aria-hidden="true"></i></a>
      </article>`;
  }).join('');
  refrescarIconos();
  observarReveal(cont);
}

/* ---------- 14. Menú activo según la sección visible (index) ---------- */
function initMenuActivo() {
  const links = $$('.nav__link[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const secciones = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => {
        if (a.getAttribute('href') === `#${en.target.id}`) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secciones.forEach((s) => obs.observe(s));
}

/* En celular, mientras se completa un formulario, los botones flotantes
   se esconden para no tapar los campos. */
function initFocoMovil() {
  const esMovil = () => window.matchMedia('(max-width: 640px)').matches;
  document.addEventListener('focusin', (e) => {
    if (esMovil() && e.target.matches('form:not(.chat__form) :is(input, select, textarea)')) document.body.classList.add('escribiendo');
  });
  document.addEventListener('focusout', () => document.body.classList.remove('escribiendo'));
}

/* ---------- 15. Arranque ---------- */
/* ---------- Modo claro / oscuro ----------
   El tema inicial lo pone un script en el <head> (sin parpadeo).
   El clic del botón también vive ahí; acá solo sincronizamos textos accesibles. */
function initTema() {
  const btn = $('#btn-tema');
  const raiz = document.documentElement;
  const metaColor = document.querySelector('meta[name="theme-color"]');
  const aplicar = (tema) => {
    raiz.dataset.tema = tema;
    const oscuro = tema === 'oscuro';
    if (btn) {
      btn.setAttribute('aria-pressed', String(oscuro));
      btn.setAttribute('aria-label', oscuro ? 'Activar modo claro' : 'Activar modo oscuro');
      btn.title = oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    }
    if (metaColor) metaColor.content = oscuro ? '#0E1631' : '#123FB3';
  };
  // El clic lo maneja el script del <head>; acá solo actualizamos textos y color de la barra
  const sincronizar = () => aplicar(raiz.dataset.tema === 'oscuro' ? 'oscuro' : 'claro');
  sincronizar();
  document.addEventListener('tema-cambiado', sincronizar);
  // Si la persona nunca eligió, seguimos al sistema cuando cambia
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => {
    let guardado = null;
    try { guardado = localStorage.getItem('tema'); } catch (err) { /* nada */ }
    if (!guardado) aplicar(e.matches ? 'oscuro' : 'claro');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTema();
  initHeader();
  initCatalogo();
  initModal();
  initFormularios();
  initContadores();
  initForo();
  initEmpleos();
  initFlotantes();
  initMenuActivo();
  initFocoMovil();
  $$('[data-anio]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  refrescarIconos();
  observarReveal();
});
