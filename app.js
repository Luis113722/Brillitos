/**
 * BRILLITOS — LÍNEA CAPILAR
 * Interactive Application & Client Engine
 */

// Global State
const appState = {
  cart: [],
  quiz: {
    texture: '',
    goal: '',
    frequency: '',
    currentStep: 1
  }
};

// Database of Products
const PRODUCTS_DATA = {
  shampoo: {
    id: 'shampoo',
    name: 'Shampoo Capilar Estimulante (500ml)',
    size: '500 ml • Fórmula Sin Sal',
    price: 35000,
    image: 'Archivos/Shampoo.jpg',
    badge: 'Fórmula Sin Sal',
    tagline: 'Crecimiento desde la raíz & nutrición activa',
    desc: 'Elaborado con infusión concentrada de Romero, Canela, Jengibre, Clavito de Olor, Cebolla y Cafeína estimulante. Limpia profundamente el folículo sin remover la barrera lipídica, reactivando el crecimiento y aportando resistencia.',
    features: [
      'Sin sal ni sulfatos agresivos',
      'Con cafeína para estimular el flujo sanguíneo folicular',
      'Activos botánicos puros de Romero y Cebolla',
      'Fórmula 100% libre de crueldad animal',
      'Envase generoso de 500ml de larga duración'
    ]
  },
  acondicionador: {
    id: 'acondicionador',
    name: 'Acondicionador Romero de Seda (500ml)',
    size: '500 ml • Romero & Mantecas Nutritivas',
    price: 35000,
    image: 'Archivos/Acindicionador2.jpeg',
    badge: 'Desenredo Instantáneo',
    tagline: 'Sellado de cutícula, brillo y suavidad de seda',
    desc: 'Tratamiento desenredante formulado con extracto de Romero y agentes emolientes naturales que transforman hebras enredadas o secas en un velo suave, brillante y manejable.',
    features: [
      'Desenredo suave sin romper el cabello',
      'Sella las puntas abiertas y reduce el frizz',
      'No deja sensación pesada ni grasosa',
      'Apto para cabellos crespos, ondulados o lisos',
      'Presentación de 500ml'
    ]
  },
  combo: {
    id: 'combo',
    name: 'Combo Shampoo + Acondicionador',
    size: 'Dúo Esencial • 500ml c/u',
    price: 69000,
    image: 'Archivos/Shampoo+Acondicionador.jpg',
    badge: 'Dúo Favorito',
    tagline: 'Limpieza profunda y desenredo de seda',
    desc: 'El dúo perfecto para tu rutina de lavado. Incluye Shampoo Capilar Estimulante (500ml) y Acondicionador Romero de Seda (500ml). Limpia suavemente sin sal y desenreda al instante dejando el cabello brillante y manejable.',
    features: [
      'Shampoo Capilar 500ml sin sal con cafeína y romero',
      'Acondicionador Romero de Seda 500ml',
      'Nutrición y suavidad desde el primer lavado',
      'Fórmula 100% botánica y libre de crueldad',
      'Precio especial en combo: $69.000 COP'
    ]
  },
  tonico: {
    id: 'tonico',
    name: 'Tónico Capilar Revitalizante',
    size: 'Infusión Concentrada • Gotero / Spray',
    price: 15000,
    image: 'Archivos/Tonico.jpg',
    badge: 'Anti-Caída & Vitalidad',
    tagline: 'Tratamiento directo al cuero cabelludo',
    desc: 'Poderosa infusión botánica de Romero silvestre, Jengibre picante, Canela aromática y Clavos de olor. Actúa directamente sobre el folículo para frenar el debilitamiento y potenciar el brillo natural.',
    features: [
      'No requiere enjuague tras la aplicación',
      'Refresca y equilibra el pH del cuero cabelludo',
      'Estimula el crecimiento acelerado',
      'Aroma fresco y natural botánico'
    ]
  },
  aceite: {
    id: 'aceite',
    name: 'Aceite de Aguacate con Romero',
    size: 'Gotero Concentrado • Nutrición Pura',
    price: 15000,
    image: 'Archivos/Aceite.jpg',
    badge: 'Brillo Espejo & Puntas',
    tagline: 'Nutrición lipídica profunda & protección',
    desc: 'Unión alquímica de aceite puro de aguacate extra virgen prensado en frío con esencia de romero. Nutre la fibra desde el interior, sella las puntas y regala un brillo reflectante que hipnotiza.',
    features: [
      'Aporte intensivo de vitaminas A, D, E y Omega 9',
      'Control total del encrespamiento y frizz',
      'Termoprotección y brillo deslumbrante',
      'Toque seco aterciopelado sin apelmazar'
    ]
  },
  kit: {
    id: 'kit',
    name: 'Kit Completo Despierta tu Luz (4 Productos)',
    size: 'Rutina Completa en 3 Pasos',
    price: 100000,
    image: 'Archivos/Kit Completo.jpg',
    badge: 'Rutina Integral 360°',
    tagline: 'La experiencia definitiva Brillitos',
    desc: 'Incluye los 4 productos esenciales de la línea: Shampoo Capilar (500ml), Acondicionador Desenredante (500ml), Tónico Revitalizante y Aceite Elixir de Aguacate & Romero. Todo lo que necesitas para tu rutina de amor y constancia.',
    features: [
      'Paso 1: Shampoo y Acondicionador 500ml',
      'Paso 2: Tónico Capilar de Romero & Jengibre',
      'Paso 3: Aceite Nutritivo de Aguacate + Romero',
      'Regalo especial con tu compra',
      'Rutina integral con precio especial de $100.000 COP'
    ]
  }
};

// Format currency in COP
function formatCOP(amount) {
  return '$' + amount.toLocaleString('es-CO') + ' COP';
}

// Sparkle Canvas Animation Engine
function initSparkles() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const sparkles = [];
  const sparkleColors = ['#D4AF37', '#E5B95F', '#C68B59', '#FBF8F2'];

  class Sparkle {
    constructor(x, y, isMouse = false) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.size = Math.random() * (isMouse ? 4.5 : 2.5) + 1;
      this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      this.alpha = Math.random() * 0.7 + 0.3;
      this.speedAlpha = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
      this.vy = (Math.random() - 0.5) * 0.4;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.rot = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.isMouse = isMouse;
      this.life = isMouse ? 45 : Infinity;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rot += this.rotSpeed;
      this.alpha += this.speedAlpha;

      if (this.alpha <= 0.1 || this.alpha >= 0.9) {
        this.speedAlpha = -this.speedAlpha;
      }

      if (this.isMouse) {
        this.life--;
        this.alpha = Math.max(0, this.life / 45);
      } else {
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));

      // Draw 4-point star sparkle
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 2);
      ctx.quadraticCurveTo(0, 0, s * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 2);
      ctx.quadraticCurveTo(0, 0, -s * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Create ambient particles
  const count = Math.min(width > 768 ? 40 : 20, 50);
  for (let i = 0; i < count; i++) {
    sparkles.push(new Sparkle());
  }

  // Mouse interaction sparkles
  let lastMove = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMove > 60) {
      sparkles.push(new Sparkle(e.clientX, e.clientY, true));
      lastMove = now;
    }
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sp = sparkles[i];
      sp.update();
      sp.draw();

      if (sp.isMouse && sp.life <= 0) {
        sparkles.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

// Shopping Cart Functions
function addToCart(productId, name, price, image) {
  const existing = appState.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({
      id: productId,
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  updateCartUI();
  openCart();
  showToastNotification(`Agregado a tu bolsa: ${name}`);
}

function updateCartQty(productId, delta) {
  const item = appState.cart.find(item => item.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    appState.cart = appState.cart.filter(i => i.id !== productId);
  }

  updateCartUI();
}

function removeCartItem(productId) {
  appState.cart = appState.cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const totalAmount = document.getElementById('cart-total-amount');

  const totalItems = appState.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = appState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (badge) badge.textContent = totalItems;
  if (totalAmount) totalAmount.textContent = formatCOP(totalPrice);

  if (!itemsContainer) return;

  if (appState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state" id="cart-empty-state">
        <i class="fa-solid fa-sparkles empty-icon"></i>
        <p>Tu bolsa de compras está vacía.</p>
        <span>Agrega productos para armar tu pedido express por WhatsApp.</span>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = appState.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">${formatCOP(item.price)}</span>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" aria-label="Disminuir">-</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" aria-label="Aumentar">+</button>
        </div>
      </div>
      <button class="cart-remove-item" onclick="removeCartItem('${item.id}')" title="Eliminar">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}

// Send Cart to WhatsApp
function sendCartToWhatsApp() {
  if (appState.cart.length === 0) {
    alert('Tu bolsa de compras está vacía. Añade un producto primero.');
    return;
  }

  const name = document.getElementById('cust-name')?.value.trim() || 'Cliente Especial';
  const city = document.getElementById('cust-city')?.value.trim() || 'Por definir';

  let message = `¡Hola Brillitos! ✨ Deseo hacer el siguiente pedido:\n\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `📍 *Ciudad/Destino:* ${city}\n\n`;
  message += `📦 *PRODUCTOS SELECCIONADOS:*\n`;

  let total = 0;
  appState.cart.forEach((item, index) => {
    const sub = item.price * item.qty;
    total += sub;
    message += `${index + 1}. ${item.name} x${item.qty} = ${formatCOP(sub)}\n`;
  });

  message += `\n💰 *Total Estimado:* ${formatCOP(total)}\n\n`;
  message += `¿Me confirman disponibilidad y el valor del envío, por favor? ¡Gracias! ✨🌿`;

  const encoded = encodeURIComponent(message);
  const waURL = `https://wa.me/573233299764?text=${encoded}`;
  window.open(waURL, '_blank');
}

// Product Quick View Modal
function openProductModal(productId) {
  const prod = PRODUCTS_DATA[productId];
  if (!prod) return;

  const content = document.getElementById('modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-box">
        <img src="${prod.image}" alt="${prod.name}">
      </div>
      <div class="modal-info">
        <span class="modal-size-badge">${prod.badge}</span>
        <h3>${prod.name}</h3>
        <p style="font-style: italic; color: var(--brand-bronze); margin-bottom: 12px;">"${prod.tagline}"</p>
        <p class="modal-desc" style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 16px;">${prod.desc}</p>
        
        <ul class="modal-bullets">
          ${prod.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
        </ul>

        <div class="modal-price">${formatCOP(prod.price)}</div>

        <button class="btn-luxury" style="width: 100%; justify-content: center;" onclick="addToCart('${prod.id}', '${prod.name}', ${prod.price}, '${prod.image}'); closeProductModal();">
          <i class="fa-solid fa-bag-shopping"></i>
          <span>Añadir a mi Bolsa</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('product-modal')?.classList.add('open');
}

function closeProductModal() {
  document.getElementById('product-modal')?.classList.remove('open');
}

// Poster Modal
function openPosterModal() {
  document.getElementById('poster-modal')?.classList.add('open');
}

function closePosterModal() {
  document.getElementById('poster-modal')?.classList.remove('open');
}

// Filter products
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const categories = cat.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Interactive Hair Quiz
function selectQuizOption(step, value, el) {
  // Visual selected state
  const siblings = el.parentElement.querySelectorAll('.quiz-option-card');
  siblings.forEach(s => s.style.borderColor = 'var(--border-subtle)');
  el.style.borderColor = 'var(--brand-gold)';

  if (step === 1) {
    appState.quiz.texture = value;
    setTimeout(() => {
      goToQuizStep(2);
    }, 280);
  } else if (step === 2) {
    appState.quiz.goal = value;
    setTimeout(() => {
      goToQuizStep(3);
    }, 280);
  } else if (step === 3) {
    appState.quiz.frequency = value;
    setTimeout(() => {
      renderQuizResult();
    }, 320);
  }
}

function goToQuizStep(stepNumber) {
  document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
  const target = document.getElementById(`quiz-step-${stepNumber}`);
  if (target) {
    target.classList.add('active');
  }

  const progress = document.getElementById('quiz-progress');
  if (progress) {
    progress.style.width = (stepNumber * 33.3) + '%';
  }
}

function renderQuizResult() {
  document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
  const resultStep = document.getElementById('quiz-result');
  if (resultStep) resultStep.classList.add('active');

  const progress = document.getElementById('quiz-progress');
  if (progress) progress.style.width = '100%';

  const summary = document.getElementById('result-summary-text');
  const routineCard = document.getElementById('recommended-routine-card');
  const waBtn = document.getElementById('quiz-whatsapp-btn');

  let routineTitle = '';
  let items = [];
  let tip = '';

  const texture = appState.quiz.texture;
  const goal = appState.quiz.goal;

  if (texture.includes('Rizado') || texture.includes('Afro')) {
    routineTitle = 'Ritual Corona Radiante (Nutrición Lipídica & Definición)';
    items = [
      'Paso 1: Shampoo sin sal con Romero & Cafeína (limpieza gentil sin resecar)',
      'Paso 1b: Acondicionador Desenredo de Seda (hidratación profunda)',
      'Paso 2: Tónico Revitalizante diario en cuero cabelludo',
      'Paso 3: Aceite de Aguacate + Romero para sellar rulos y controlar frizz'
    ];
    tip = 'Para tus rizos, aplica el Aceite de Aguacate en las puntas con el método "scrunch" con el cabello húmedo.';
  } else if (goal.includes('Caída') || goal.includes('Crecimiento')) {
    routineTitle = 'Ritual Raíz Fuerte & Crecimiento Acelerado';
    items = [
      'Paso 1: Shampoo Estimulante con Cafeína, Romero & Cebolla (500ml)',
      'Paso 2: Tónico Capilar Revitalizante con Jengibre y Canela (aplicar 1-2 veces al día)',
      'Paso 3: Acondicionador Romero en medios a puntas para evitar rotura'
    ];
    tip = 'La constancia es la clave. Aplica el tónico en la noche masajeando durante 3 minutos para activar la circulación sanguínea.';
  } else {
    routineTitle = 'Ritual Esplendor & Brillo Espejo 360°';
    items = [
      'Paso 1: Shampoo Capilar sin sal con extractos botánicos puros',
      'Paso 1b: Acondicionador Desenredo para suavidad y elasticidad',
      'Paso 2: Tónico de Romero para revitalizar la raíz',
      'Paso 3: Gotitas de Aceite de Aguacate para un brillo dorado deslumbrante'
    ];
    tip = 'Usa el Aceite de Aguacate antes de secar o peinar para protegerlo del calor y la contaminación.';
  }

  if (summary) {
    summary.innerHTML = `Basado en tu cabello <strong>${texture}</strong> y tu meta de <strong>${goal}</strong>, tu rutina personalizada es:`;
  }

  if (routineCard) {
    routineCard.innerHTML = `
      <h4 class="rec-title">✨ ${routineTitle}</h4>
      <ul class="rec-products-list">
        ${items.map(it => `<li><i class="fa-solid fa-sparkles"></i> <span>${it}</span></li>`).join('')}
      </ul>
      <p class="rec-tip">💡 <strong>Consejo experto:</strong> ${tip}</p>
    `;
  }

  if (waBtn) {
    const textMsg = encodeURIComponent(
      `¡Hola Brillitos! ✨ Acabo de realizar el Test Capilar en su página web:\n` +
      `- Textura: ${appState.quiz.texture}\n` +
      `- Objetivo: ${appState.quiz.goal}\n` +
      `- Rutina recomendada: ${routineTitle}\n\n` +
      `Quisiera encargar esta rutina personalizada. ¿Cómo podemos coordinar el envío? 🌿`
    );
    waBtn.href = `https://wa.me/573233299764?text=${textMsg}`;
  }
}

function restartQuiz() {
  appState.quiz = { texture: '', goal: '', frequency: '', currentStep: 1 };
  document.querySelectorAll('.quiz-option-card').forEach(s => s.style.borderColor = 'var(--border-subtle)');
  goToQuizStep(1);
}

// Toast Notification
function showToastNotification(msg) {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(30px);
    background: #25160E;
    color: #FAF6EE;
    padding: 12px 24px;
    border-radius: 30px;
    border: 1px solid var(--border-gold);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    z-index: 5000;
    opacity: 0;
    transition: all 0.35s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 20);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// Newsletter Subscription Handler
function handleNewsletter() {
  const emailInput = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');
  if (!emailInput || !feedback) return;

  const email = emailInput.value.trim();
  if (!email || !email.includes('@')) {
    feedback.textContent = 'Por favor ingresa un correo válido.';
    feedback.style.color = '#FFA07A';
    return;
  }

  feedback.innerHTML = `¡Bienvenida a la familia Brillitos! ✨ Usa el cupón <strong>BRILLITOS10</strong> al pedir por WhatsApp para tu 10% OFF.`;
  feedback.style.color = '#E5B95F';
  emailInput.value = '';
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initSparkles();
  initProductFilters();

  // Cart toggle buttons
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartClose = document.getElementById('cart-close-btn');
  const cartOverlay = document.getElementById('cart-overlay');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Close modals on overlay click
  document.getElementById('product-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'product-modal') closeProductModal();
  });

  document.getElementById('poster-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'poster-modal') closePosterModal();
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Close with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
      closePosterModal();
    }
  });
});
