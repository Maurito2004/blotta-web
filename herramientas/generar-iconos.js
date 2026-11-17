// Genera assets/iconos.js con SOLO los íconos de Lucide que usa el sitio (de 358 KB a ~10 KB).
// Uso: bajar https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js y correr: node herramientas/generar-iconos.js lucide.min.js .
const fs = require('fs');
const path = require('path');
const [, , rutaLucide, sitio] = process.argv;

// Cargar la UMD de lucide en un "window" simulado
const ventana = {};
new Function('window', 'self', 'globalThis', fs.readFileSync(rutaLucide, 'utf8'))(ventana, ventana, ventana);
const lucide = ventana.lucide;
if (!lucide || !lucide.icons) throw new Error('No pude leer lucide.icons');

// Nombres usados: data-lucide="..." en HTML/JS + icono: '...' en los datos
const textos = ['index.html', 'foro.html', 'trabaja-con-nosotros.html', 'main.js'].map((f) => fs.readFileSync(path.join(sitio, f), 'utf8')).join('\n');
const nombres = new Set();
for (const m of textos.matchAll(/data-lucide="([a-z0-9-]+)"/g)) nombres.add(m[1]);
for (const m of textos.matchAll(/icono: '([a-z0-9-]+)'/g)) nombres.add(m[1]);

const aPascal = (n) => n.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const salida = {};
const faltan = [];
for (const n of [...nombres].sort()) {
  const nodo = lucide.icons[aPascal(n)];
  if (!nodo) { faltan.push(n); continue; }
  // Formatos posibles: [[tag, attrs], ...]  o  ['svg', attrs, [[tag, attrs], ...]]
  const hijos = nodo[0] === 'svg' ? nodo[2] : nodo;
  if (!Array.isArray(hijos) || !Array.isArray(hijos[0])) throw new Error(`Formato inesperado en ${n}: ${JSON.stringify(nodo).slice(0, 120)}`);
  salida[n] = hijos.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
}
if (faltan.length) { console.error('Íconos que no existen en lucide:', faltan.join(', ')); process.exit(1); }

const js = `/* Íconos Lucide (ISC License, https://lucide.dev) — solo los que usa este sitio.
   Generado desde lucide@0.468.0. Para sumar un ícono, agregalo con data-lucide="nombre"
   y volvé a correr: node herramientas/generar-iconos.js lucide.min.js . */
(function () {
  var ICONOS = ${JSON.stringify(salida)};
  function crear(i) {
    var nombre = i.getAttribute('data-lucide');
    var cuerpo = ICONOS[nombre];
    if (!cuerpo) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + cuerpo + '</svg>';
    var svg = tmp.firstChild;
    for (var k = 0; k < i.attributes.length; k++) {
      var a = i.attributes[k];
      if (a.name === 'data-lucide') continue;
      if (a.name === 'class') continue;
      svg.setAttribute(a.name, a.value);
    }
    svg.setAttribute('class', ('lucide lucide-' + nombre + ' ' + (i.getAttribute('class') || '')).trim());
    i.parentNode.replaceChild(svg, i);
  }
  window.lucide = {
    createIcons: function () {
      var lista = document.querySelectorAll('i[data-lucide]');
      for (var n = 0; n < lista.length; n++) crear(lista[n]);
    }
  };
})();
`;
fs.writeFileSync(path.join(sitio, 'assets', 'iconos.js'), js);
console.log(`${Object.keys(salida).length} íconos -> assets/iconos.js (${Buffer.byteLength(js)} bytes)`);
