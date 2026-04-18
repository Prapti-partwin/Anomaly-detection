/* ── CLOCK ── */
function tick() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toTimeString().slice(0, 8);
}
setInterval(tick, 1000);
tick();

/* ── SLIDER UPDATE ── */
function updateSlider(key, val) {
  const map = {
    temp: { id: 'temp', min: -10, max: 100 },
    hum:  { id: 'hum',  min: 0,   max: 100 },
    bat:  { id: 'bat',  min: 0,   max: 100 },
  };
  const m = map[key];
  document.getElementById(m.id + '-val').textContent = val;
  const pct = ((val - m.min) / (m.max - m.min)) * 100;
  document.getElementById(m.id + '-gauge').style.width = pct + '%';
}

/* ── SESSION STATS ── */
const stats = { total: 0, normal: 0, anomaly: 0 };

function incStats(type) {
  stats.total++;
  stats[type]++;
  document.getElementById('stat-total').textContent   = stats.total;
  document.getElementById('stat-normal').textContent  = stats.normal;
  document.getElementById('stat-anomaly').textContent = stats.anomaly;
}

/* ── REQUEST LOG ── */
let logEntries = [];

function addLog(temp, hum, bat, result) {
  const now = new Date().toTimeString().slice(0, 8);
  logEntries.unshift({ time: now, temp, hum, bat, result });
  if (logEntries.length > 50) logEntries.pop();
  renderLog();
}

function renderLog() {
  const ul = document.getElementById('log-list');
  if (!logEntries.length) {
    ul.innerHTML = '<li class="log-empty">// NO ENTRIES YET</li>';
    return;
  }
  ul.innerHTML = logEntries.map(e => `
    <li class="log-item">
      <span class="log-time">${e.time}</span>
      <span class="log-vals">T:${e.temp}° H:${e.hum}% B:${e.bat}%</span>
      <span class="log-badge ${e.result === 0 ? 'badge-normal' : 'badge-anomaly'}">
        ${e.result === 0 ? 'NORM' : 'ANOM'}
      </span>
    </li>`).join('');
}

function clearLog() {
  logEntries = [];
  renderLog();
}

/* ── QUICK PRESETS ── */
const PRESETS = {
  normal: { temp: 25, hum: 60, bat: 80 },
  hot:    { temp: 90, hum: 30, bat: 55 },
  humid:  { temp: 28, hum: 97, bat: 70 },
  lowbat: { temp: 22, hum: 50, bat: 5  },
};

function loadPreset(key) {
  const p = PRESETS[key];
  document.getElementById('temp-slider').value = p.temp;
  document.getElementById('hum-slider').value  = p.hum;
  document.getElementById('bat-slider').value  = p.bat;
  updateSlider('temp', p.temp);
  updateSlider('hum',  p.hum);
  updateSlider('bat',  p.bat);
}

/* ── MESSAGE HELPERS ── */
function showMsg(id, text, show = true) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.toggle('show', show);
}

/* ── PREDICT ── */
async function predict() {
  const btn  = document.getElementById('predict-btn');
  const temp = parseFloat(document.getElementById('temp-slider').value);
  const hum  = parseFloat(document.getElementById('hum-slider').value);
  const bat  = parseFloat(document.getElementById('bat-slider').value);
  const base = document.getElementById('api-url').value.replace(/\/$/, '');

  showMsg('err-msg',  '', false);
  showMsg('info-msg', '', false);

  btn.disabled = true;
  document.getElementById('btn-text').innerHTML = '<span class="spinner"></span>ANALYZING...';

  try {
    const res = await fetch(`${base}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature: temp, humidity: hum, battery: bat }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    showResult(data.anomaly, data.status);
    incStats(data.anomaly === 0 ? 'normal' : 'anomaly');
    addLog(temp, hum, bat, data.anomaly);

  } catch (err) {
    showMsg('err-msg', `⚠ CONNECTION FAILED — ${err.message} — check API endpoint`, true);
    showResultError();
  } finally {
    btn.disabled = false;
    document.getElementById('btn-text').innerHTML = '⬡ Run Detection';
  }
}

/* ── RENDER RESULT ── */
function showResult(code) {
  const panel = document.getElementById('result-panel');
  const badge = document.getElementById('res-code-badge');

  if (code === 0) {
    badge.textContent = 'RESULT: 0x00 — NORMAL';
    panel.className   = 'result-panel status-normal';
    panel.innerHTML   = `
      <div class="result-pulse pulse-normal">✔</div>
      <div class="result-status">NORMAL</div>
      <div class="result-code">ANOMALY_CODE: 0 — NO THREAT DETECTED</div>`;
  } else {
    badge.textContent = 'RESULT: 0x01 — ANOMALY';
    panel.className   = 'result-panel status-anomaly';
    panel.innerHTML   = `
      <div class="result-pulse pulse-anomaly">⚠</div>
      <div class="result-status">ANOMALY</div>
      <div class="result-code">ANOMALY_CODE: 1 — ABNORMAL BEHAVIOR</div>`;
  }
}

function showResultError() {
  const panel = document.getElementById('result-panel');
  panel.className = 'result-panel result-idle';
  panel.innerHTML = `
    <div class="result-icon" style="color:var(--red);opacity:0.6;font-size:36px;">✕</div>
    <div class="result-msg" style="color:var(--red);">API UNREACHABLE</div>`;
}

/* ── PING / TEST CONNECTION ── */
async function testConnection() {
  const base = document.getElementById('api-url').value.replace(/\/$/, '');
  const pingMsg = document.getElementById('ping-msg');

  pingMsg.className = 'msg-bar msg-info show';
  showMsg('ping-msg', '…pinging', true);

  try {
    const res = await fetch(`${base}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showMsg('ping-msg', `✔ CONNECTED — ${base}`, true);
  } catch (e) {
    pingMsg.className = 'msg-bar msg-error show';
    showMsg('ping-msg', `✘ FAILED — ${e.message}`, true);
  }
}
