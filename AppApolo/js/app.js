/* ============================================================
   APOLO — APP LOGIC
   ============================================================ */

'use strict';

// ============================================================
// DADOS MOCK
// ============================================================
const mockReports = [
  {
    id: 'APL-001',
    type: 'Roubo/Furto',
    icon: 'fa-masks-theater',
    risk: 'high',
    riskLabel: 'Alto Risco',
    riskColor: '#E53935',
    riskBg: 'rgba(229,57,53,0.1)',
    desc: 'Assalto a mão armada registrado próximo ao ponto de ônibus. Dois suspeitos em moto, capacete preto.',
    location: 'Av. Paulista, próx. metrô Consolação',
    time: 'Há 15 min',
    witnesses: 3,
    lat: -23.5630,
    lng: -46.6543,
  },
  {
    id: 'APL-002',
    type: 'Iluminação',
    icon: 'fa-lightbulb-slash',
    risk: 'moderate',
    riskLabel: 'Risco Moderado',
    riskColor: '#FB8C00',
    riskBg: 'rgba(251,140,0,0.1)',
    desc: 'Rua completamente sem iluminação desde segunda-feira. Trecho de 3 quarteirões no escuro.',
    location: 'R. Augusta, entre Bela Cintra e Consolação',
    time: 'Há 2 horas',
    witnesses: 7,
    lat: -23.5558,
    lng: -46.6567,
  },
  {
    id: 'APL-003',
    type: 'Via Perigosa',
    icon: 'fa-road-barrier',
    risk: 'attention',
    riskLabel: 'Atenção',
    riskColor: '#F9A825',
    riskBg: 'rgba(253,216,53,0.12)',
    desc: 'Buraco grande no meio da via, sem sinalização. Já causou acidente com motociclista.',
    location: 'Rua Haddock Lobo, 480',
    time: 'Há 1 dia',
    witnesses: 12,
    lat: -23.5570,
    lng: -46.6620,
  },
  {
    id: 'APL-004',
    type: 'Suspeito',
    icon: 'fa-user-secret',
    risk: 'attention',
    riskLabel: 'Atenção',
    riskColor: '#F9A825',
    riskBg: 'rgba(253,216,53,0.12)',
    desc: 'Pessoa com comportamento suspeito rondando o estacionamento há mais de 1 hora.',
    location: 'Shopping Paulista, Estacionamento B3',
    time: 'Há 30 min',
    witnesses: 2,
    lat: -23.5618,
    lng: -46.6552,
  },
  {
    id: 'APL-005',
    type: 'Acidente',
    icon: 'fa-car-burst',
    risk: 'high',
    riskLabel: 'Alto Risco',
    riskColor: '#E53935',
    riskBg: 'rgba(229,57,53,0.1)',
    desc: 'Colisão entre carro e moto. SAMU já foi acionado. Via parcialmente bloqueada.',
    location: 'Av. Rebouças x R. Groenlândia',
    time: 'Há 5 min',
    witnesses: 8,
    lat: -23.5652,
    lng: -46.6698,
  },
  {
    id: 'APL-006',
    type: 'Tráfico',
    icon: 'fa-skull-crossbones',
    risk: 'high',
    riskLabel: 'Alto Risco',
    riskColor: '#E53935',
    riskBg: 'rgba(229,57,53,0.1)',
    desc: 'Movimentação suspeita de tráfico no beco lateral. Pessoas entrando e saindo com frequência.',
    location: 'R. Peixoto Gomide, beco lateral',
    time: 'Há 45 min',
    witnesses: 1,
    lat: -23.5643,
    lng: -46.6512,
  },
];

const mockNotifications = [
  {
    id: 1,
    icon: 'fa-triangle-exclamation',
    iconClass: 'notif-icon--yellow',
    title: 'Novo alerta na sua área',
    desc: 'Roubo reportado a 300m da sua localização atual.',
    time: 'Agora',
    unread: true,
  },
  {
    id: 2,
    icon: 'fa-circle-check',
    iconClass: 'notif-icon--blue',
    title: 'Sua denúncia foi verificada',
    desc: 'A denúncia #APL-001 foi confirmada por 3 testemunhas.',
    time: '30 min atrás',
    unread: true,
  },
  {
    id: 3,
    icon: 'fa-bell',
    iconClass: 'notif-icon--blue',
    title: 'Atualização de status',
    desc: 'A ocorrência #APL-003 foi encaminhada à Prefeitura.',
    time: '2 horas atrás',
    unread: true,
  },
  {
    id: 4,
    icon: 'fa-shield',
    iconClass: 'notif-icon--blue',
    title: 'Área liberada',
    desc: 'A rua bloqueada na Av. Rebouças foi normalizada.',
    time: '1 dia atrás',
    unread: false,
  },
];

const faqData = [
  {
    q: 'Como faço uma denúncia anônima?',
    a: 'Toque no ícone de megafone na tela principal ou acesse "Nova Denúncia" pelo menu. Sua identidade nunca é revelada — usamos criptografia ponta a ponta.',
  },
  {
    q: 'Como fico sabendo que minha denúncia foi recebida?',
    a: 'Após o envio, você recebe um número de protocolo. Com ele, acompanhe o status em "Minhas Denúncias" no menu de perfil.',
  },
  {
    q: 'O que acontece ao acionar o modo emergência?',
    a: 'Os serviços de emergência da sua cidade são notificados com sua localização em tempo real. Mantenha o app aberto até o socorro chegar.',
  },
  {
    q: 'Minhas fotos ficam salvas no servidor?',
    a: 'Imagens são criptografadas antes do envio e armazenadas temporariamente. Após análise, são excluídas dos nossos servidores.',
  },
  {
    q: 'Posso usar sem criar conta?',
    a: 'Sim! O modo anônimo permite usar o mapa e ver ocorrências sem cadastro. Para denunciar, recomendamos ao menos um e-mail anônimo.',
  },
  {
    q: 'Quem tem acesso às denúncias?',
    a: 'Apenas órgãos de segurança pública parceiros. Nunca compartilhamos com terceiros ou empresas privadas.',
  },
];

const zoneData = {
  zone1: {
    name: 'Zona de Alta Atenção — Centro',
    risk: 'Alto Risco',
    riskClass: 'chip--red',
    incidents: [mockReports[0], mockReports[5]],
  },
  zone2: {
    name: 'Área de Atenção — Consolação',
    risk: 'Atenção',
    riskClass: 'chip--yellow',
    incidents: [mockReports[1], mockReports[2]],
  },
  zone3: {
    name: 'Área Segura — Jardins',
    risk: 'Seguro',
    riskClass: 'chip--green',
    incidents: [],
  },
};

// ============================================================
// ESTADO DO FORMULÁRIO
// ============================================================
const reportState = {
  incidentType: null,
  risk: 'Baixo',
  desc: '',
  location: 'Localização atual',
  witness: null,
  currentStep: 1,
};

// ============================================================
// SPLASH → ONBOARDING
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Mostra splash
  const splashScreen = document.getElementById('screen-splash');
  splashScreen.style.display = 'flex';
  splashScreen.classList.add('active');
  NAV.currentScreen = 'splash';

  // Inicializa onboarding (primeira slide ativa)
  const slides = document.querySelectorAll('.onboarding-slide');
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === 0);
  });

  // Barra de progresso do splash
  const progressFill = document.getElementById('splashProgress');
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    if (progressFill) progressFill.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => navigate('onboarding'), 300);
    }
  }, 40);
});

// ============================================================
// ONBOARDING
// ============================================================
let obSlide = 0;

document.addEventListener('DOMContentLoaded', () => {
  const btnNext = document.getElementById('btnObNext');
  const btnSkip = document.getElementById('btnObSkip');

  if (btnNext) btnNext.addEventListener('click', onboardingNext);
  if (btnSkip) btnSkip.addEventListener('click', () => navigate('login'));
});

function onboardingNext() {
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots   = document.querySelectorAll('.ob-dot');
  const btn    = document.getElementById('btnObNext');

  obSlide++;
  if (obSlide >= slides.length) {
    navigate('login');
    return;
  }

  slides.forEach((s, i) => s.classList.toggle('active', i === obSlide));
  dots.forEach((d, i)   => d.classList.toggle('active', i === obSlide));

  if (btn) btn.textContent = obSlide === slides.length - 1 ? 'Começar' : 'Próximo';
}

// ============================================================
// MAPA
// ============================================================
let mapInstance = null;
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  const defaultCenter = [-23.5608, -46.6560];

  mapInstance = L.map('map', {
    zoomControl: false,
    attributionControl: false,
  }).setView(defaultCenter, 15);

  // Tiles OSM (padrão)
  const lightTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  });

  const darkTiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  });

  lightTiles.addTo(mapInstance);
  window._mapTiles = { light: lightTiles, dark: darkTiles };

  // Geolocalização
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        mapInstance.setView([lat, lng], 15);
        addUserMarker(lat, lng);
      },
      () => {
        addUserMarker(defaultCenter[0], defaultCenter[1]);
      }
    );
  } else {
    addUserMarker(defaultCenter[0], defaultCenter[1]);
  }

  // Zonas de risco
  addRiskZones();

  // Marcadores de ocorrências
  addReportMarkers();

  // Controle de zoom customizado
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  // Recalcula tamanho do mapa
  setTimeout(() => mapInstance.invalidateSize(), 300);
}

function addUserMarker(lat, lng) {
  const userIcon = L.divIcon({
    html: `<div style="
      width:18px;height:18px;background:#1E88E5;border-radius:50%;
      border:3px solid white;box-shadow:0 2px 8px rgba(30,136,229,0.5);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    className: '',
  });
  L.marker([lat, lng], { icon: userIcon })
    .addTo(mapInstance)
    .bindPopup('<b>Você está aqui</b>');
}

function addRiskZones() {
  const zones = [
    { lat: -23.5630, lng: -46.6543, color: '#E53935', opacity: 0.18, radius: 300, id: 'zone1' },
    { lat: -23.5570, lng: -46.6620, color: '#FB8C00', opacity: 0.15, radius: 250, id: 'zone2' },
    { lat: -23.5558, lng: -46.6480, color: '#43A047', opacity: 0.12, radius: 200, id: 'zone3' },
  ];

  zones.forEach(z => {
    L.circle([z.lat, z.lng], {
      color: z.color,
      fillColor: z.color,
      fillOpacity: z.opacity,
      opacity: 0.4,
      weight: 2,
      radius: z.radius,
    })
    .addTo(mapInstance)
    .on('click', () => openZoneDetail(z.id));
  });
}

function addReportMarkers() {
  mockReports.forEach(r => {
    const colors = { high: '#E53935', moderate: '#FB8C00', attention: '#FDD835', safe: '#43A047' };
    const color = colors[r.risk] || '#9E9E9E';

    const icon = L.divIcon({
      html: `<div style="
        width:32px;height:32px;background:${color};border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);border:2px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;
        align-items:center;justify-content:center;
      ">
        <i class='fa-solid ${r.icon}' style='transform:rotate(45deg);color:white;font-size:13px;display:flex;align-items:center;justify-content:center;width:100%;height:100%;'></i>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: '',
    });

    L.marker([r.lat, r.lng], { icon })
      .addTo(mapInstance)
      .on('click', () => openReportDetail(r.id));
  });
}

function openZoneDetail(zoneId) {
  const zone = zoneData[zoneId];
  if (!zone) return;

  document.getElementById('zoneTitle').textContent = zone.name;

  let html = `<span class="chip ${zone.riskClass} zone-risk-label"><span class="chip-dot"></span>${zone.risk}</span>`;

  if (zone.incidents.length === 0) {
    html += '<p style="color:var(--text-hint);font-size:13px">Nenhuma ocorrência registrada.</p>';
  } else {
    html += '<div class="zone-incidents">';
    zone.incidents.forEach(inc => {
      html += `
        <div class="zone-incident-item" onclick="openReportDetail('${inc.id}');closeOverlay('zone-overlay')">
          <div class="zii-icon" style="background:${inc.riskBg};color:${inc.riskColor}">
            <i class="fa-solid ${inc.icon}"></i>
          </div>
          <div class="zii-body">
            <div class="zii-type">${inc.type}</div>
            <div class="zii-desc">${inc.desc.substring(0, 70)}...</div>
            <div class="zii-time">${inc.time} · ${inc.location}</div>
          </div>
        </div>`;
    });
    html += '</div>';
  }

  html += `<button class="btn btn--primary btn--full" style="margin-top:16px" onclick="closeOverlay('zone-overlay');navigate('report')">
    <i class="fa-solid fa-bullhorn"></i> Denunciar nessa área
  </button>`;

  document.getElementById('zoneContent').innerHTML = html;
  openOverlay('zone-overlay');
}

// ============================================================
// LISTA DE OCORRÊNCIAS
// ============================================================
function renderReportsList() {
  const container = document.getElementById('reportsList');
  if (!container) return;

  container.innerHTML = mockReports.map(r => `
    <div class="report-item" onclick="openReportDetail('${r.id}')">
      <div class="ri-header">
        <span class="ri-type">${r.type}</span>
        <span class="chip ${riskToChipClass(r.risk)}">${r.riskLabel}</span>
      </div>
      <p class="ri-desc">${r.desc}</p>
      <div class="ri-footer">
        <i class="fa-solid fa-location-dot"></i>
        <span>${r.location}</span>
        <span style="margin-left:auto">${r.time}</span>
        <i class="fa-solid fa-users"></i>
        <span>${r.witnesses}</span>
      </div>
    </div>
  `).join('');
}

function riskToChipClass(risk) {
  const map = { high: 'chip--red', moderate: 'chip--orange', attention: 'chip--yellow', safe: 'chip--green' };
  return map[risk] || '';
}

function openReportDetail(reportId) {
  const report = mockReports.find(r => r.id === reportId);
  if (!report) return;

  window._currentReportDetail = report;

  const container = document.getElementById('detailContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="detail-header">
      <div class="detail-meta">
        <span class="chip ${riskToChipClass(report.risk)}">${report.riskLabel}</span>
        <i class="fa-solid fa-clock"></i> ${report.time}
      </div>
      <h2 class="detail-title">${report.type}</h2>
      <div class="detail-meta">
        <i class="fa-solid fa-location-dot" style="color:var(--blue)"></i>
        ${report.location}
      </div>
    </div>
    <p class="detail-desc">${report.desc}</p>
    <div class="detail-section">
      <div class="detail-section-title">Protocolo</div>
      <div class="protocol-box" style="width:100%;display:flex;flex-direction:column;align-items:center;padding:12px 16px">
        <span>#${report.id}</span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Testemunhas</div>
      <div class="witness-confirm">
        <p>Você também testemunhou esta ocorrência?</p>
        <div class="btns">
          <button class="btn btn--primary" onclick="confirmWitness('${report.id}', true)" style="flex:1">
            <i class="fa-solid fa-check"></i> Sim
          </button>
          <button class="btn btn--ghost" onclick="confirmWitness('${report.id}', false)" style="flex:1">
            <i class="fa-solid fa-xmark"></i> Não
          </button>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Dados</div>
      <div class="report-summary">
        <div class="rs-row">
          <span class="rs-label">ID</span>
          <span class="rs-value">#${report.id}</span>
        </div>
        <div class="rs-row">
          <span class="rs-label">Tipo</span>
          <span class="rs-value">${report.type}</span>
        </div>
        <div class="rs-row">
          <span class="rs-label">Testemunhas</span>
          <span class="rs-value">${report.witnesses} confirmações</span>
        </div>
        <div class="rs-row">
          <span class="rs-label">Registrado</span>
          <span class="rs-value">${report.time}</span>
        </div>
      </div>
    </div>
  `;

  navigate('report-detail');
}

function confirmWitness(reportId, confirmed) {
  if (confirmed) {
    showToast('Sua confirmação foi registrada!', 'fa-check-circle');
    const report = mockReports.find(r => r.id === reportId);
    if (report) report.witnesses++;
  } else {
    showToast('Entendido. Obrigado pelo retorno.');
  }
}

function shareReport() {
  showToast('Link copiado!', 'fa-copy');
}

// ============================================================
// FORMULÁRIO DE DENÚNCIA
// ============================================================
function resetReportForm() {
  reportState.incidentType = null;
  reportState.risk = 'Baixo';
  reportState.currentStep = 1;
  reportState.witness = null;

  // Reseta cards selecionados
  document.querySelectorAll('.incident-card').forEach(c => c.classList.remove('selected'));

  // Reseta botões de risco
  document.querySelectorAll('.risk-btn').forEach(b => b.classList.remove('active'));
  const firstRisk = document.querySelector('.risk-btn--green');
  if (firstRisk) firstRisk.classList.add('active');

  // Reseta testemunha
  document.querySelectorAll('.witness-btn').forEach(b => b.classList.remove('selected'));

  // Desativa botão próximo
  const btnNext = document.getElementById('btnStep1Next');
  if (btnNext) btnNext.disabled = true;

  // Mostra step 1
  goToStep(1);

  // Atualiza steps bar
  updateStepsBar(1);
}

function selectIncident(el, type) {
  document.querySelectorAll('.incident-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  reportState.incidentType = type;

  const btn = document.getElementById('btnStep1Next');
  if (btn) btn.disabled = false;
}

function selectRisk(el) {
  document.querySelectorAll('.risk-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  reportState.risk = el.dataset.risk;
}

function goToStep(step) {
  // Esconde todos os steps
  document.querySelectorAll('.report-step').forEach(s => s.classList.remove('active'));

  // Mostra step atual
  const targetStep = document.getElementById('reportStep' + step);
  if (targetStep) targetStep.classList.add('active');

  reportState.currentStep = step;
  updateStepsBar(step);

  // Step 3: preenche resumo
  if (step === 3) fillReportSummary();
}

function updateStepsBar(activeStep) {
  document.querySelectorAll('.step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.remove('active', 'done');
    if (n < activeStep) s.classList.add('done');
    if (n === activeStep) s.classList.add('active');
  });
}

function fillReportSummary() {
  const container = document.getElementById('reportSummary');
  if (!container) return;

  container.innerHTML = `
    <div class="rs-row">
      <span class="rs-label">Tipo de ocorrência</span>
      <span class="rs-value">${reportState.incidentType || '—'}</span>
    </div>
    <div class="rs-row">
      <span class="rs-label">Nível de risco</span>
      <span class="rs-value">${reportState.risk}</span>
    </div>
    <div class="rs-row">
      <span class="rs-label">Localização</span>
      <span class="rs-value">${reportState.location}</span>
    </div>
    <div class="rs-row">
      <span class="rs-label">Enviado como</span>
      <span class="rs-value"><i class="fa-solid fa-user-secret"></i> Anônimo</span>
    </div>
  `;
}

function setWitness(value) {
  reportState.witness = value;
  document.getElementById('witnessYes').classList.toggle('selected', value === true);
  document.getElementById('witnessNo').classList.toggle('selected', value === false);
}

function submitReport() {
  if (reportState.incidentType === null) {
    showToast('Selecione o tipo de ocorrência', 'fa-circle-exclamation');
    return;
  }

  const protocol = 'APL-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('successProtocol').textContent = '#' + protocol;
  document.getElementById('successTitle').textContent = 'Denúncia Enviada!';
  document.getElementById('successMessage').textContent = 'Sua denúncia foi recebida e está em análise. Obrigado por contribuir com a segurança da comunidade.';

  navigate('success');
  showToast('Denúncia enviada com sucesso!', 'fa-check-circle');
}

function triggerMediaUpload() {
  showToast('Upload de mídia ativo', 'fa-camera');
}

function setLocation(type) {
  const labels = {
    current: 'Localização atual (GPS)',
    manual: 'Endereço manual',
    map: 'Marcado no mapa',
  };
  reportState.location = labels[type] || 'Localização atual';
  const el = document.getElementById('reportLocation');
  if (el) el.textContent = reportState.location;
  closeOverlay('location-overlay');
  showToast('Localização definida');
}

// ============================================================
// EMERGÊNCIA (TELA)
// ============================================================
let emergencyTimer = null;
let emergencyProgress = 0;
const EMERGENCY_HOLD_MS = 3000;
const EMERGENCY_INTERVAL_MS = 50;

function resetEmergencyScreen() {
  cancelEmergencyScreen();
  const idle   = document.getElementById('emergencyIdle');
  const active = document.getElementById('emergencyActive');
  if (idle)   idle.style.display   = 'flex';
  if (active) active.style.display = 'none';

  const ring = document.getElementById('eRingProg');
  if (ring) ring.style.strokeDashoffset = '327';
}

function startEmergencyScreen(e) {
  e.preventDefault();
  emergencyProgress = 0;

  const ring = document.getElementById('eRingProg');
  const circumference = 327;

  emergencyTimer = setInterval(() => {
    emergencyProgress += EMERGENCY_INTERVAL_MS;
    const offset = circumference - (circumference * emergencyProgress / EMERGENCY_HOLD_MS);
    if (ring) ring.style.strokeDashoffset = Math.max(0, offset).toString();

    if (emergencyProgress >= EMERGENCY_HOLD_MS) {
      clearInterval(emergencyTimer);
      triggerEmergencyActive();
    }
  }, EMERGENCY_INTERVAL_MS);
}

function cancelEmergencyScreen() {
  if (emergencyTimer) {
    clearInterval(emergencyTimer);
    emergencyTimer = null;
  }
  emergencyProgress = 0;
  const ring = document.getElementById('eRingProg');
  if (ring) ring.style.strokeDashoffset = '327';
}

function triggerEmergencyActive() {
  const idle   = document.getElementById('emergencyIdle');
  const active = document.getElementById('emergencyActive');
  if (idle)   idle.style.display   = 'none';
  if (active) active.style.display = 'flex';

  const protocol = 'APL-' + Math.floor(100000 + Math.random() * 900000);
  const el = document.getElementById('eaProtocol');
  if (el) el.textContent = '#' + protocol;

  showToast('Emergência acionada! Protocolo: #' + protocol, 'fa-siren-on', 5000);
}

function cancelEmergencyActive() {
  showConfirm({
    title: 'Cancelar emergência?',
    message: 'Os serviços de emergência serão avisados do cancelamento.',
    onConfirm: () => {
      resetEmergencyScreen();
      showToast('Emergência cancelada', 'fa-circle-check');
    }
  });
}

// ============================================================
// FAB EMERGÊNCIA (HOME)
// ============================================================
let fabEmergencyTimer = null;
let fabEmergencyProgress = 0;

function startEmergencyHold(e) {
  e.preventDefault();
  fabEmergencyProgress = 0;
  const ring = document.getElementById('emergencyRing');
  const circumference = 157;

  fabEmergencyTimer = setInterval(() => {
    fabEmergencyProgress += EMERGENCY_INTERVAL_MS;
    const offset = circumference - (circumference * fabEmergencyProgress / EMERGENCY_HOLD_MS);
    if (ring) ring.style.strokeDashoffset = Math.max(0, offset).toString();

    if (fabEmergencyProgress >= EMERGENCY_HOLD_MS) {
      clearInterval(fabEmergencyTimer);
      navigate('emergency');
      setTimeout(triggerEmergencyActive, 300);
    }
  }, EMERGENCY_INTERVAL_MS);
}

function cancelEmergencyHold() {
  if (fabEmergencyTimer) {
    clearInterval(fabEmergencyTimer);
    fabEmergencyTimer = null;
  }
  fabEmergencyProgress = 0;
  const ring = document.getElementById('emergencyRing');
  if (ring) ring.style.strokeDashoffset = '157';
}

// ============================================================
// NOTIFICAÇÕES
// ============================================================
function renderNotifications() {
  const container = document.getElementById('notificationsList');
  if (!container) return;

  if (mockNotifications.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text-hint)">
      <i class="fa-regular fa-bell-slash" style="font-size:48px;margin-bottom:12px;display:block"></i>
      Nenhuma notificação
    </div>`;
    return;
  }

  container.innerHTML = mockNotifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markRead(${n.id})">
      <div class="notif-icon ${n.iconClass}">
        <i class="fa-solid ${n.icon}"></i>
      </div>
      <div class="notif-body">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function markRead(id) {
  const notif = mockNotifications.find(n => n.id === id);
  if (notif) notif.unread = false;
  renderNotifications();
}

function markAllRead() {
  mockNotifications.forEach(n => n.unread = false);
  renderNotifications();
  showToast('Todas marcadas como lidas');
}

// ============================================================
// FAQ
// ============================================================
function renderFAQ() {
  const container = document.getElementById('faqList');
  if (!container) return;

  container.innerHTML = faqData.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-question" onclick="toggleFAQ(${i})">
        <span>${item.q}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="faq-answer">${item.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById('faq-' + index);
  if (!item) return;
  item.classList.toggle('open');
}

// ============================================================
// AUTENTICAÇÃO
// ============================================================
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  }
}

function maskCPF(input) {
  let v = input.value.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = v;
}

function checkPasswordStrength(input) {
  const val = input.value;
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;

  let strength = 0;
  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const levels = [
    { pct: '0%',   color: 'var(--gray-300)', text: 'Força da senha' },
    { pct: '25%',  color: 'var(--red)',       text: 'Fraca' },
    { pct: '50%',  color: 'var(--orange)',    text: 'Regular' },
    { pct: '75%',  color: 'var(--yellow-dark)', text: 'Boa' },
    { pct: '100%', color: 'var(--green)',     text: 'Forte' },
  ];

  const level = levels[strength];
  fill.style.width = level.pct;
  fill.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;
}

// ============================================================
// LOGOUT
// ============================================================
function confirmLogout() {
  closeAllOverlays();
  setTimeout(() => {
    showConfirm({
      title: 'Encerrar Sessão',
      message: 'Você será desconectado do APOLO. Deseja continuar?',
      onConfirm: () => navigate('login'),
    });
  }, 250);
}

// ============================================================
// DARK MODE
// ============================================================
function toggleDarkMode(checkbox) {
  document.documentElement.setAttribute('data-theme', checkbox.checked ? 'dark' : '');

  // Troca tiles do mapa se inicializado
  if (mapInstance && window._mapTiles) {
    if (checkbox.checked) {
      mapInstance.removeLayer(window._mapTiles.light);
      window._mapTiles.dark.addTo(mapInstance);
    } else {
      mapInstance.removeLayer(window._mapTiles.dark);
      window._mapTiles.light.addTo(mapInstance);
    }
  }

  showToast(checkbox.checked ? 'Modo escuro ativado' : 'Modo claro ativado');
}

// ============================================================
// FILTER / TABS
// ============================================================
function filterRisk(type) {
  showToast('Filtro aplicado: ' + type);
}

function applyFilter() {
  closeOverlay('filter-overlay');
  showToast('Filtros aplicados');
}

function switchTab(btn, tab) {
  document.querySelectorAll('#reportsTabs .tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderReportsList();
}
