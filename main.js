/* =========================================================
   BLOTTA – main.js
   Todo el comportamiento del sitio (sin frameworks).
   Cada bloque se activa solo si su sección existe en la página,
   así el mismo archivo sirve para index, foro y trabajá con nosotros.
   ========================================================= */

/* ---------- 1. Constantes para reemplazar ---------- */

// REEMPLAZAR: número real de WhatsApp (formato internacional, sin + ni espacios).
const WHATSAPP_NUMERO = '549XXXXXXXXXX';
const WHATSAPP_MENSAJE = 'Hola Blotta, quiero hacer una consulta sobre sus máquinas.';

// Email de Recursos Humanos para las búsquedas laborales
const EMAIL_RRHH = 'blottaindustriasrrhh@gmail.com';

/* ---------- 2. Datos del catálogo ----------
   Para cargar los datos reales, editá este array.
   - categoria: 'lineas' | 'conformadoras' | 'complementarios'
   - imagen: ruta a la foto real (ej. 'assets/fotos/linea.jpg'). Vacío = placeholder.
   - video: ID de YouTube (lo que va después de "v=" en el link). Vacío = placeholder.
   - specs: DATOS DE EJEMPLO, reemplazar por los reales. */
const MAQUINAS = [
  {
    id: 'linea-empanadas',
    nombre: 'Línea automática de empanadas',
    categoria: 'lineas',
    icono: 'factory',
    imagen: '', // REEMPLAZAR: foto real
    video: '',  // REEMPLAZAR: ID de video de YouTube
    descripcion: 'Laminado, cortado, dosificado y repulgado en una sola línea continua.',
    detalle: 'Integra todas las etapas de producción en un flujo continuo: la masa entra laminada y salen empanadas listas para hornear o congelar. Pensada para plantas que producen para distribución y exportación.',
    caracteristicas: ['Producción continua con un solo operario por turno', 'Moldes intercambiables para distintos formatos', 'Estructura de acero inoxidable apta alimentaria'],
    specs: { 'Producción': 'hasta 3.000 u/h', 'Peso por unidad': '40 – 120 g', 'Consumo': '7,5 kW' }
  },
  {
    id: 'linea-tapas',
    nombre: 'Línea automática de tapas y discos',
    categoria: 'lineas',
    icono: 'circle-dot',
    imagen: '',
    video: '',
    descripcion: 'Produce y apila discos de masa para empanadas y pascualinas.',
    detalle: 'Lamina, corta y apila tapas con separador, listas para envasar. Ideal para fábricas que venden tapas al mercado minorista o abastecen a franquicias.',
    caracteristicas: ['Apilado automático con separador', 'Diámetros configurables', 'Recuperación de recortes de masa'],
    specs: { 'Producción': 'hasta 6.000 discos/h', 'Diámetro': '10 – 32 cm', 'Consumo': '5,5 kW' }
  },
  {
    id: 'conformadora',
    nombre: 'Conformadora de empanadas',
    categoria: 'conformadoras',
    icono: 'settings-2',
    imagen: '',
    video: '',
    descripcion: 'Cierra y da forma a cada empanada con terminación pareja.',
    detalle: 'Recibe el disco con relleno y lo cierra con forma y presión constantes, para que cada unidad salga igual. Se puede usar sola o integrada a una línea.',
    caracteristicas: ['Formato de repulgue configurable', 'Cambio de molde sin herramientas', 'Bajo nivel de ruido'],
    specs: { 'Producción': 'hasta 1.800 u/h', 'Peso por unidad': '40 – 100 g', 'Consumo': '2,2 kW' }
  },
  {
    id: 'laminadora',
    nombre: 'Laminadora de masa',
    categoria: 'conformadoras',
    icono: 'layers',
    imagen: '',
    video: '',
    descripcion: 'Lamina la masa al espesor exacto, sin romper su estructura.',
    detalle: 'Rodillos regulables para lograr un espesor uniforme en masas de empanadas, tartas y hojaldres. Mantiene la textura de la receta tradicional.',
    caracteristicas: ['Regulación fina de espesor', 'Rodillos desmontables para limpieza', 'Cinta de entrada y salida'],
    specs: { 'Ancho de laminado': '50 cm', 'Espesor': '0,5 – 20 mm', 'Consumo': '1,5 kW' }
  },
  {
    id: 'cortadora-discos',
    nombre: 'Cortadora de discos',
    categoria: 'conformadoras',
    icono: 'disc-3',
    imagen: '',
    video: '',
    descripcion: 'Corta discos de masa uniformes y reduce el desperdicio.',
    detalle: 'Corte rotativo de alta precisión para obtener discos idénticos. El diseño de los moldes aprovecha al máximo la lámina de masa.',
    caracteristicas: ['Moldes de distintos diámetros', 'Aprovechamiento optimizado de la lámina', 'Protecciones de seguridad'],
    specs: { 'Producción': 'hasta 4.000 discos/h', 'Diámetro': '8 – 20 cm', 'Consumo': '1,1 kW' }
  },
  {
    id: 'dosificadora',
    nombre: 'Dosificadora de relleno',
    categoria: 'complementarios',
    icono: 'pipette',
    imagen: '',
    video: '',
    descripcion: 'Deposita la cantidad justa de relleno en cada unidad.',
    detalle: 'Dosificación volumétrica para rellenos con trozos, cremosos o húmedos. Garantiza el peso exacto y reduce las mermas.',
    caracteristicas: ['Apta para rellenos con trozos', 'Dosis regulable desde el panel', 'Tolva de acero inoxidable'],
    specs: { 'Dosis': '10 – 80 g', 'Precisión': '± 1 g', 'Consumo': '0,75 kW' }
  },
  {
    id: 'repulgadora',
    nombre: 'Repulgadora',
    categoria: 'complementarios',
    icono: 'waves',
    imagen: '',
    video: '',
    descripcion: 'Repulgue con terminación artesanal, a velocidad industrial.',
    detalle: 'Reproduce el repulgue hecho a mano para que el producto conserve su identidad. Se adapta a distintos formatos de cierre.',
    caracteristicas: ['Terminación tipo artesanal', 'Formatos de repulgue intercambiables', 'Fácil limpieza'],
    specs: { 'Producción': 'hasta 1.500 u/h', 'Formatos': '3 tipos de cierre', 'Consumo': '0,9 kW' }
  },
  {
    id: 'cinta',
    nombre: 'Cinta transportadora',
    categoria: 'complementarios',
    icono: 'arrow-right-left',
    imagen: '',
    video: '',
    descripcion: 'Une equipos y lleva el producto entre etapas sin manipularlo.',
    detalle: 'Cintas sanitarias modulares para conectar laminado, dosificado, cierre y bandejeo. Se fabrican a la medida de tu planta.',
    caracteristicas: ['Banda sanitaria apta alimentos', 'Largo y velocidad a medida', 'Módulos combinables'],
    specs: { 'Largo': '1 – 6 m', 'Velocidad': 'regulable', 'Consumo': '0,37 kW' }
  }
];

const CATEGORIAS = {
  lineas: 'Línea automática',
  conformadoras: 'Conformadoras y laminadoras',
  complementarios: 'Equipo complementario'
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
    return `<img class="foto ${clase}" src="${m.imagen}" alt="${escapar(m.nombre)}" loading="lazy">`;
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
        <article class="maquina ${m.categoria === 'lineas' ? 'maquina--linea' : ''} reveal" style="--d:${Math.min(i, 5) * 55}ms" aria-labelledby="maq-${m.id}">
          ${htmlImagen(m)}
          <div class="maquina__cuerpo">
            <span class="chip">${CATEGORIAS[m.categoria]}</span>
            <h3 class="maquina__nombre" id="maq-${m.id}">${escapar(m.nombre)}</h3>
            <p class="maquina__desc">${escapar(m.descripcion)}</p>
            ${htmlSpecs(m.specs)}
            <span class="nota-ejemplo"><i data-lucide="info" aria-hidden="true"></i> Dato de ejemplo</span>
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

  const video = m.video
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.video)}" title="Video: ${escapar(m.nombre)} en funcionamiento" allowfullscreen loading="lazy"></iframe>`
    : `<!-- REEMPLAZAR: cargá el ID de YouTube en el campo "video" de esta máquina en main.js -->
       <div class="foto" role="img" aria-label="Espacio para el video de la máquina">
         <span class="video__play"><i data-lucide="play" aria-hidden="true"></i></span>
         <span class="foto__texto">Video próximamente</span>
       </div>`;

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
        <h3 style="margin-bottom:10px">Mirá cómo funciona</h3>
        <div class="video">${video}</div>
        <h3 style="margin-top:20px;margin-bottom:6px">Datos técnicos</h3>
        ${htmlSpecs(m.specs)}
        <p class="nota-ejemplo" style="margin-top:8px"><i data-lucide="info" aria-hidden="true"></i> Datos de ejemplo: los valores reales dependen de la configuración.</p>
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
      responder(`Tenemos ${MAQUINAS.length} equipos: líneas automáticas, conformadoras, laminadoras y equipos complementarios. Te llevo al catálogo 👇`);
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
    [/maquina|catalogo|linea|laminadora|conformadora|dosificadora|repulg|cinta|cortadora|equipo/, 'maquinas']
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
document.addEventListener('DOMContentLoaded', () => {
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
