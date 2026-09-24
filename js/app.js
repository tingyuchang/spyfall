/* 誰是間諜 — 純前端、零後端。
   一局的全部資訊都塞在網址的 # 片段裡，# 不會送到伺服器，只在手機本機解讀。 */

/* ── 工具 ───────────────────────────────────────────── */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ── 狀態 ───────────────────────────────────────────── */

const state = {
  locations: [],
  config: { minPlayers: 3, maxPlayers: 12, twoSpiesFrom: 9, roundMinutes: 8 },  // 會被 locations.json 的 config 覆寫
  round: null,        // 目前這一局
  setup: { players: 6, spies: 1 },
  seat: null,         // 玩家自己的座位號
};

const locationById = (id) => state.locations.find((l) => l.id === id);
const spyCount = () => state.round.spySeats.length;
const isSpySeat = (seat) => state.round.spySeats.includes(seat);

/* ── 畫面切換 ───────────────────────────────────────── */

function show(name) {
  $$('.screen').forEach((el) => { el.hidden = el.dataset.screen !== name; });
  document.body.dataset.screen = name;   // 供 CSS 切換版型（例如地點牆的投影模式）
  window.scrollTo(0, 0);
}

/* ── 地點牆 ─────────────────────────────────────────── */

const imageOf = (l) => l.image || `images/locations/${l.id}.jpg`;

/* 圖片蓋在 emoji 上；還沒產圖或載入失敗就把 img 拿掉，露出底下的 emoji */
const pic = (src, emoji) =>
  `<div class="pic"><span class="pic-emoji">${emoji}</span><img src="${src}" alt="" draggable="false" onerror="this.remove()"></div>`;

/* 投影用圖片牆：名稱疊在圖片下緣，每格固定 4:3，才能精準算出擠得進一個畫面的大小 */
function renderBoardWall() {
  $('#boardWall').innerHTML = state.locations
    .map((l) => `<div class="tile">${pic(imageOf(l), l.emoji)}<span class="tile-name">${l.name}</span></div>`)
    .join('');
  fitBoardWall();
}

/* 找「放得下全部、且格子最大」的欄數。欄數越少格子越大，所以由少往多試，第一個放得下的就是答案 */
function fitBoardWall() {
  const wall = $('#boardWall');
  const n = state.locations.length;
  const gap = parseFloat(getComputedStyle(wall).gap) || 0;
  const W = wall.clientWidth, H = wall.clientHeight;
  let cols = n, w = 0;
  for (let c = 1; c <= n; c++) {
    w = (W - (c - 1) * gap) / c;
    const rows = Math.ceil(n / c);
    if (rows * w * 3 / 4 + (rows - 1) * gap <= H) { cols = c; break; }
  }
  wall.style.setProperty('--tile', Math.floor(w) + 'px');
  wall.style.gridTemplateColumns = `repeat(${cols}, var(--tile))`;
}

/* ── Host：倒數計時 ─────────────────────────────────── */

const timer = { left: 0, endAt: 0, id: null };

function startTimer() {
  stopTimer();
  timer.left = state.config.roundMinutes * 60_000;
  document.body.classList.remove('timeup');
  resumeTimer();
}
function resumeTimer() {
  timer.endAt = Date.now() + timer.left;
  timer.id = setInterval(tickTimer, 250);   // 每次用 Date.now() 重算，不會因為 setInterval 延遲而越跑越慢
  tickTimer();
}
function stopTimer() {
  clearInterval(timer.id);
  timer.id = null;
}
function togglePause() {
  if (timer.left <= 0) return;
  if (timer.id) { stopTimer(); timer.left = timer.endAt - Date.now(); renderTimer(); } else resumeTimer();
}
function tickTimer() {
  if (document.body.dataset.screen !== 'board') return stopTimer();   // 離開投影畫面就停
  timer.left = Math.max(0, timer.endAt - Date.now());
  renderTimer();
  if (timer.left === 0) {
    stopTimer();
    document.body.classList.add('timeup');
    navigator.vibrate?.([400, 150, 400, 150, 400]);
  }
}
function renderTimer() {
  const sec = Math.ceil(timer.left / 1000);
  $('#timer').textContent = timer.left === 0
    ? '時間到！'
    : `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  $('#btnPause').textContent = timer.id || timer.left === 0 ? '暫停' : '繼續';
  $('#btnPause').disabled = timer.left === 0;
}

/* ── Host：設定畫面 ─────────────────────────────────── */

function renderSetup() {
  const { minPlayers, maxPlayers } = state.config;
  $('#playerCount').innerHTML = Array.from({ length: maxPlayers - minPlayers + 1 }, (_, i) => minPlayers + i)
    .map((n) => `<button class="chip" data-count="${n}" aria-pressed="${n === state.setup.players}">${n}</button>`)
    .join('');

  // 人數夠多才開放「兩個間諜」，且非強制
  const canTwo = state.setup.players >= state.config.twoSpiesFrom;
  if (!canTwo) state.setup.spies = 1;
  $('#spyField').hidden = !canTwo;
  if (canTwo) {
    $('#spyCount').innerHTML = [1, 2]
      .map((n) => `<button class="chip" data-spies="${n}" aria-pressed="${n === state.setup.spies}">${n} 個</button>`)
      .join('');
    $('#spyHint').textContent = state.setup.spies === 2
      ? '兩個間諜互相不知道對方是誰，其他人也只知道有兩個。'
      : `${state.config.twoSpiesFrom} 人以上可以選兩個間諜，會更混亂更好玩。`;
  }
}

/* ── Host：產生一局 ─────────────────────────────────── */

function newRound() {
  const { players, spies } = state.setup;
  const loc = state.locations[randInt(state.locations.length)];

  const seats = new Set();
  while (seats.size < Math.min(spies, players)) seats.add(randInt(players) + 1);

  state.round = {
    locationId: loc.id,
    spySeats: [...seats].sort((a, b) => a - b),
    players,
    startSeat: randInt(players) + 1,
    nonce: Math.random().toString(36).slice(2, 8),
  };
  state.round.roles = assignRoles(loc.roles.length, players, state.round.spySeats);
  showQR();
}

function showQR() {
  const url = location.origin + location.pathname + '#' + encodeRound(state.round);
  $('#qrCount').textContent = state.round.players;
  $('#qrUrl').textContent = url;

  const box = $('#qrBox');
  box.innerHTML = '';
  new QRCode(box, { text: url, width: 480, height: 480, correctLevel: QRCode.CorrectLevel.M });

  show('qr');
}

function showBoard() {
  const n = spyCount();
  $('#startsWith').textContent =
    `由 ${state.round.startSeat} 號玩家先發問。` +
    (n > 1 ? `　本局有 ${n} 個間諜。` : '');
  show('board');
  renderBoardWall();   // 要在 show 之後，才量得到尺寸
  startTimer();
}

/* ── 玩家 ───────────────────────────────────────────── */

const seatKey = () => 'seat:' + state.round.nonce;

function readSeat() {
  try { return +localStorage.getItem(seatKey()) || null; } catch { return null; }
}
function writeSeat(n) {
  try { localStorage.setItem(seatKey(), String(n)); } catch { /* 無痕模式：不記就算了 */ }
}

function renderSeatPicker() {
  $('#seatPicker').innerHTML = Array.from({ length: state.round.players }, (_, i) =>
    `<button class="seat" data-seat="${i + 1}">${i + 1}</button>`).join('');
  show('seat');
}

function showRole() {
  const { seat, round } = state;
  const loc = locationById(round.locationId);
  const n = spyCount();

  const card = isSpySeat(seat)
    ? `<div class="role spy">
         ${pic('images/spy.jpg', '🕵️')}
         <div class="title">你是間諜</div>
         <ul>
           <li>你<b>不知道</b>地點在哪裡。</li>
           <li>從大家的問答推測地點，同時<b>裝作你也知道</b>。</li>
           <li>隨時可以亮身分猜地點，猜對就贏。</li>
           ${n > 1 ? '<li>本局還有<b>另一個間諜</b>，但你不知道是誰。</li>' : ''}
         </ul>
       </div>`
    : `<div class="role civilian">
         ${pic(imageOf(loc), loc.emoji)}
         <div class="title">${loc.name}</div>
         <div class="job">${loc.roles[round.roles[seat - 1]]}</div>
         <ul>
           <li>問答時證明你知道地點，但<b>別講太明顯</b>，否則間諜就猜到了。</li>
           ${n > 1 ? `<li>本局有 <b>${n} 個</b>間諜，投票時記得。</li>` : ''}
         </ul>
       </div>`;

  // 預設蓋住，按住才顯示；蓋住時平民和間諜長得一模一樣，連高度都一樣
  $('#roleCard').innerHTML =
    `<div class="seat-tag">${seat} 號玩家</div>
     <div class="reveal" tabindex="0" role="button" aria-label="按住顯示身分">
       <div class="cover"><div class="cover-icon">🔒</div><b>按住顯示身分</b><span>放開就會蓋回去</span></div>
       <div class="revealed" hidden>${card}</div>
     </div>`;

  show('role');
}

function setRevealed(on) {
  const r = $('#roleCard .reveal');
  if (!r) return;
  $('.cover', r).hidden = on;
  $('.revealed', r).hidden = !on;
}

/* 地點清單：點一下變灰表示排除，存在本機、跟著這一局 */
const crossKey = () => 'x:' + state.round.nonce;

function readCrossed() {
  try { return new Set(JSON.parse(localStorage.getItem(crossKey())) || []); } catch { return new Set(); }
}
function writeCrossed(set) {
  try { localStorage.setItem(crossKey(), JSON.stringify([...set])); } catch { /* 無痕模式：不記就算了 */ }
}

function renderPlayerWall() {
  const crossed = readCrossed();
  $('#playerWall').innerHTML = state.locations
    .map((l) => `<button class="loc" data-loc="${l.id}" aria-pressed="${crossed.has(l.id)}">
        <span class="loc-emoji">${l.emoji}</span><span class="loc-name">${l.name}</span></button>`)
    .join('');
}

/* ── 事件 ───────────────────────────────────────────── */

function wireEvents() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.dataset.go) {
      const dest = btn.dataset.go;
      if (dest === 'setup') renderSetup();
      if (dest === 'locations') renderPlayerWall();
      if (dest === 'role') return showRole();
      return show(dest);
    }

    if (btn.dataset.count) {
      state.setup.players = +btn.dataset.count;
      return renderSetup();
    }
    if (btn.dataset.spies) {
      state.setup.spies = +btn.dataset.spies;
      return renderSetup();
    }
    if (btn.dataset.loc) {
      const crossed = readCrossed();
      const id = btn.dataset.loc;
      crossed.has(id) ? crossed.delete(id) : crossed.add(id);
      writeCrossed(crossed);
      return btn.setAttribute('aria-pressed', crossed.has(id));
    }
    if (btn.dataset.seat) {
      state.seat = +btn.dataset.seat;
      writeSeat(state.seat);
      return showRole();
    }
  });

  // 按住顯示：放開、手指滑走、切到背景都蓋回去。監聽 window，因為按下後 cover 會被藏起來
  const onCard = (e) => e.target.closest('#roleCard .reveal');
  document.addEventListener('pointerdown', (e) => { if (onCard(e)) setRevealed(true); });
  ['pointerup', 'pointercancel', 'blur'].forEach((t) => window.addEventListener(t, () => setRevealed(false)));
  document.addEventListener('visibilitychange', () => setRevealed(false));
  document.addEventListener('contextmenu', (e) => { if (onCard(e)) e.preventDefault(); });   // Android 長按選單
  document.addEventListener('keydown', (e) => {
    if (onCard(e) && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); setRevealed(true); }
  });
  document.addEventListener('keyup', (e) => { if (onCard(e)) setRevealed(false); });

  $('#btnClearCrossed').onclick = () => { writeCrossed(new Set()); renderPlayerWall(); };
  $('#btnGenerate').onclick  = newRound;
  $('#btnRegen').onclick     = newRound;
  $('#btnNextRound').onclick = newRound;
  $('#btnStart').onclick     = showBoard;
  $('#btnFullscreen').onclick = toggleFullscreen;
  $('#btnPause').onclick     = togglePause;
  $('#btnRestart').onclick   = startTimer;
  window.addEventListener('resize', () => { if (document.body.dataset.screen === 'board') fitBoardWall(); });
  $('#btnReseat').onclick    = () => {
    try { localStorage.removeItem(seatKey()); } catch { /* ignore */ }
    state.seat = null;
    renderSeatPicker();
  };
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
}

/* ── 進入點 ─────────────────────────────────────────── */

async function main() {
  wireEvents();

  try {
    const data = await (await fetch('data/locations.json', { cache: 'no-cache' })).json();
    state.locations = data.locations;
    Object.assign(state.config, data.config || {});
    state.setup.players = Math.min(Math.max(6, state.config.minPlayers), state.config.maxPlayers);
  } catch {
    $('#errMsg').textContent = '無法載入地點資料（data/locations.json）。';
    return show('error');
  }

  const hash = location.hash.slice(1);
  if (!hash) return show('home');        // 沒有 # → 主持人模式

  try {                                   // 有 # → 玩家模式
    state.round = decodeRound(hash);
    const loc = locationById(state.round.locationId);
    if (!loc || state.round.roles.some((x) => x >= loc.roles.length)) throw new Error('unknown location/role');
  } catch {
    return show('error');
  }

  const saved = readSeat();
  if (saved && saved >= 1 && saved <= state.round.players) {
    state.seat = saved;
    showRole();
  } else {
    renderSeatPicker();
  }
}

main();
