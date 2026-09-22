// Catálogo 2026 — Florería Sode
const WHATSAPP = '528441605677';
const IMG = 'assets/img/catalogo/';

const productos = [
  // Bouquets
  { cat: 'bouquets', nombre: 'Bouquet de 12 rosas', precio: '$370', img: '12-rosas.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet de 24 rosas', precio: '$700', img: '24-rosas.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet mixto', precio: '$450', img: 'bouquet-mixto.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet de gerberas', precio: '$450', img: 'bouquet-gerberas.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet colorido', precio: '$450', img: 'bouquet-450-1.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet primaveral', precio: '$450', img: 'bouquet-450-2.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet en base · 10 gerberas', precio: '$600', img: '10-gerberas-base.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet en base grande', precio: '$1,000', img: 'bouquet-base-grande.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet de girasoles', precio: '$500', img: 'girasoles.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet de 100 rosas rojas', precio: '$2,500', img: '100-rosas-rojas.jpg' },
  { cat: 'bouquets', nombre: 'Bouquet de 100 rosas rosas y blancas', precio: '$2,500', img: '100-rosas-rosa.jpg' },

  // Cajas
  { cat: 'cajas', nombre: 'Caja bisagra', precio: '$700', nota: 'Disponible en blanco y negro', img: 'caja-bisagra.jpg' },
  { cat: 'cajas', nombre: 'Caja Elite mediana', precio: '$670', nota: 'Disponible en rosa y blanco', img: 'caja-elite-mediana.jpg' },
  { cat: 'cajas', nombre: 'Caja Elite grande', precio: '$1,400', nota: 'Disponible en rosa y blanco', img: 'caja-elite-grande.jpg' },
  { cat: 'cajas', nombre: 'Caja grande · arreglo jumbo', precio: '$1,600', img: 'caja-jumbo.jpg' },
  { cat: 'cajas', nombre: 'Caja con rosas y joyería', precio: '$600', nota: 'Disponible en rosa y blanco', img: 'caja-rosas-joyeria.jpg' },

  // Baúles, canastas y bolsas
  { cat: 'baules', nombre: 'Baúl de madera', precio: 'Chico $370 · Mediano $600', img: 'baul-madera-1.jpg' },
  { cat: 'baules', nombre: 'Baúl de madera Sode', precio: 'Chico $370 · Mediano $600', img: 'baul-madera-2.jpg' },
  { cat: 'baules', nombre: 'Baúl de lujo', precio: 'Chico $400 · Mediano $700 · Grande $1,000', img: 'baul-lujo.jpg' },
  { cat: 'baules', nombre: 'Canasta lila', precio: '$600', img: 'canasta-lila.jpg' },
  { cat: 'baules', nombre: 'Bolsa floral', precio: '$390', img: 'bolsa-floral.jpg' },

  // Arreglos y floreros
  { cat: 'arreglos', nombre: 'Arreglo mixto', precio: '$1,500', img: 'arreglo-mixto.jpg' },
  { cat: 'arreglos', nombre: 'Arreglo de 50 rosas', precio: '$1,600', img: '50-rosas-1.jpg' },
  { cat: 'arreglos', nombre: 'Arreglo de 50 rosas rojas', precio: '$1,600', img: '50-rosas-2.jpg' },
  { cat: 'arreglos', nombre: 'Florero grande', precio: '$1,200', img: 'florero-1200.jpg' },
  { cat: 'arreglos', nombre: 'Florero', precio: '$750', img: 'florero-750.jpg' },
  { cat: 'arreglos', nombre: 'Arreglo tradicional', precio: '$2,000', img: 'tradicional-1.jpg' },
  { cat: 'arreglos', nombre: 'Arreglo tradicional colorido', precio: '$2,000', img: 'tradicional-2.jpg' },
];

const waLink = (p) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `¡Hola Florería Sode! 🌸 Me interesa el "${p.nombre}" (${p.precio}) del catálogo 2026.`
  )}`;

// Render del catálogo
const grid = document.getElementById('catalog-grid');
grid.innerHTML = productos
  .map(
    (p, i) => `
    <article class="product" data-cat="${p.cat}">
      <button class="product__media" data-index="${i}" aria-label="Ver ${p.nombre} en grande">
        <img src="${IMG}${p.img}" alt="${p.nombre}" loading="lazy">
      </button>
      <div class="product__body">
        <h3>${p.nombre}</h3>
        ${p.nota ? `<p class="product__note">${p.nota}</p>` : ''}
        <p class="product__price">${p.precio}</p>
        <a class="product__order" href="${waLink(p)}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
      </div>
    </article>`
  )
  .join('');

// Filtros
const filtros = document.querySelectorAll('.filter');
filtros.forEach((btn) =>
  btn.addEventListener('click', () => {
    filtros.forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });
    const f = btn.dataset.filter;
    grid.querySelectorAll('.product').forEach((card) => {
      card.hidden = f !== 'todos' && card.dataset.cat !== f;
    });
  })
);

// Visor de imágenes
const lightbox = document.getElementById('lightbox');
grid.addEventListener('click', (e) => {
  const media = e.target.closest('.product__media');
  if (!media) return;
  const p = productos[media.dataset.index];
  lightbox.querySelector('img').src = IMG + p.img;
  lightbox.querySelector('img').alt = p.nombre;
  lightbox.querySelector('h3').textContent = p.nombre;
  lightbox.querySelector('.lightbox__price').textContent = p.precio;
  lightbox.querySelector('.btn').href = waLink(p);
  lightbox.showModal();
});
lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.close();
});

// Menú móvil
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// Sombra del encabezado al hacer scroll
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.getElementById('year').textContent = new Date().getFullYear();
