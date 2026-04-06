/* ============================================================
   APOLO — NAVIGATION SYSTEM
   Gerencia 100% da navegação: telas, overlays, bottom sheets,
   modais e backdrop. Sem travamentos.
   ============================================================ */

'use strict';

// ============================================================
// ESTADO GLOBAL
// ============================================================
const NAV = {
  currentScreen: null,
  previousScreen: null,
  openOverlays: new Set(),  // IDs de overlays abertos
  history: [],
};

// ============================================================
// NAVIGATE — trocar de tela
// ============================================================
function navigate(screenId) {
  // Fecha todos os overlays antes de navegar
  closeAllOverlays();

  const targetId = 'screen-' + screenId;
  const targetEl = document.getElementById(targetId);
  if (!targetEl) {
    console.warn('[NAV] Tela não encontrada:', targetId);
    return;
  }

  // Esconde tela atual
  if (NAV.currentScreen) {
    const currentEl = document.getElementById('screen-' + NAV.currentScreen);
    if (currentEl) {
      currentEl.classList.remove('active');
      currentEl.style.display = 'none'; // garantia extra
    }
  }

  // Guarda histórico
  if (NAV.currentScreen && NAV.currentScreen !== screenId) {
    NAV.previousScreen = NAV.currentScreen;
    NAV.history.push(NAV.currentScreen);
    if (NAV.history.length > 20) NAV.history.shift();
  }

  // Ativa nova tela
  NAV.currentScreen = screenId;
  targetEl.style.display = 'flex';
  // Force reflow para animação funcionar
  targetEl.offsetHeight;
  targetEl.classList.add('active');

  // Callbacks pós-navegação
  onScreenEnter(screenId);

  console.log('[NAV] →', screenId);
}

// Callbacks quando uma tela é aberta
function onScreenEnter(screenId) {
  switch (screenId) {
    case 'home':
      initMap();
      break;
    case 'reports-list':
      renderReportsList();
      break;
    case 'notifications':
      renderNotifications();
      break;
    case 'help':
      renderFAQ();
      break;
    case 'report':
      resetReportForm();
      break;
    case 'emergency':
      resetEmergencyScreen();
      break;
  }
}

// Voltar para tela anterior
function goBack() {
  if (NAV.history.length > 0) {
    const prev = NAV.history.pop();
    navigate(prev);
  } else {
    navigate('home');
  }
}

// ============================================================
// OVERLAY SYSTEM — lado nenhum trava
// ============================================================

/**
 * Abre um overlay (side-menu ou bottom-sheet)
 * @param {string} overlayId - ID do elemento
 */
function openOverlay(overlayId) {
  const el = document.getElementById(overlayId);
  if (!el) {
    console.warn('[NAV] Overlay não encontrado:', overlayId);
    return;
  }

  // Ativa o backdrop
  const backdrop = document.getElementById('overlayBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    // Clique no backdrop fecha tudo
    backdrop.onclick = closeAllOverlays;
  }

  // Abre o overlay
  el.classList.add('open');
  NAV.openOverlays.add(overlayId);

  // Previne scroll do body quando overlay está aberto
  document.body.style.overflow = 'hidden';

  console.log('[NAV] overlay aberto:', overlayId);
}

/**
 * Fecha um overlay específico
 * @param {string} overlayId - ID do elemento
 */
function closeOverlay(overlayId) {
  const el = document.getElementById(overlayId);
  if (!el) {
    console.warn('[NAV] Overlay para fechar não encontrado:', overlayId);
    return;
  }

  el.classList.remove('open');
  NAV.openOverlays.delete(overlayId);

  // Se não há mais overlays abertos, esconde o backdrop
  if (NAV.openOverlays.size === 0) {
    const backdrop = document.getElementById('overlayBackdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  console.log('[NAV] overlay fechado:', overlayId);
}

/**
 * Fecha TODOS os overlays abertos
 */
function closeAllOverlays() {
  // Copia o Set para evitar modificação durante iteração
  const toClose = Array.from(NAV.openOverlays);
  toClose.forEach(id => closeOverlay(id));

  // Garante que o backdrop some
  const backdrop = document.getElementById('overlayBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    backdrop.onclick = null;
  }

  document.body.style.overflow = '';

  console.log('[NAV] todos os overlays fechados');
}

// ============================================================
// MODAL SYSTEM
// ============================================================
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  el.classList.add('open');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  el.classList.remove('open');
}

// Confirmação genérica
function showConfirm({ title, message, onConfirm }) {
  document.getElementById('confirmTitle').textContent = title || 'Confirmar';
  document.getElementById('confirmMessage').textContent = message || 'Tem certeza?';

  const okBtn = document.getElementById('confirmOkBtn');
  // Remove listener anterior
  const newBtn = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newBtn, okBtn);

  newBtn.addEventListener('click', () => {
    closeModal('confirm-modal');
    if (typeof onConfirm === 'function') onConfirm();
  });

  openModal('confirm-modal');
}

// ============================================================
// MENU — navegar a partir do menu lateral
// ============================================================
function menuNavigate(screenId) {
  closeOverlay('menu-overlay');
  // Delay pequeno para animação fechar antes de navegar
  setTimeout(() => navigate(screenId), 200);
}

// ============================================================
// TOAST
// ============================================================
let toastTimer = null;

function showToast(message, icon = 'fa-check-circle', duration = 3000) {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toastMsg');
  const ico   = toast.querySelector('.toast-icon');
  if (!toast || !msg) return;

  msg.textContent = message;
  if (ico) {
    ico.className = 'toast-icon fa-solid ' + icon;
  }
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ============================================================
// KEYBOARD — ESC fecha overlays
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (NAV.openOverlays.size > 0) {
      closeAllOverlays();
    }
  }
});

// ============================================================
// SWIPE — swipe direita fecha menu lateral
// ============================================================
(function setupSwipe() {
  let startX = 0;
  let startY = 0;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    // Swipe horizontal significativo
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      const menuOverlay = document.getElementById('menu-overlay');
      if (menuOverlay && menuOverlay.classList.contains('open')) {
        if (dx < 0) { // swipe left = fecha menu
          closeOverlay('menu-overlay');
        }
      }
    }
  }, { passive: true });
})();

// ============================================================
// INICIALIZAÇÃO — garante estado limpo no load
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Garante que todas as telas estão escondidas (exceto a padrão)
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  // Garante que todos os overlays estão fechados
  document.querySelectorAll('.side-menu, .bottom-sheet').forEach(o => {
    o.classList.remove('open');
  });

  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.classList.remove('open');
  });

  const backdrop = document.getElementById('overlayBackdrop');
  if (backdrop) backdrop.classList.remove('active');

  NAV.openOverlays.clear();

  // Botão X do menu — garantia adicional de event listener direto
  const closeMenuBtn = document.getElementById('btnMenuClose');
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeOverlay('menu-overlay');
    });
  }

  console.log('[NAV] Sistema de navegação iniciado.');
});
