/* 一局的資料格式：純邏輯，不碰 DOM，app.js 和 tests.html 共用。

   locationId | spySeats | players | startSeat | nonce | roles
   hospital     "2,7"      人數      起始玩家    亂數     每個座位的職業 index，間諜那格留空

   ⚠️ 已發出去的 QR 要能繼續解：不改欄位順序、不在中間插欄位、不改既有地點 id、
   不改既有職業的順序（roles 存的是 index，新職業只能加在最後）。 */

const randInt = (n) => Math.floor(Math.random() * n);

const b64url = {
  // encodeURIComponent/unescape：讓 btoa 吃得下非 ASCII（以防之後 id 有中文）
  encode: (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
  decode: (s) => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/')))),
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* 職業洗牌後依序發給非間諜座位，不夠就從頭循環。回傳長度 = players，間諜那格是 null。
   ponytail: 職業數不夠時循環重複；想完全不重複就把每個地點補到 maxPlayers-1 個職業 */
function assignRoles(roleCount, players, spySeats) {
  const deck = shuffle(Array.from({ length: roleCount }, (_, i) => i));
  let k = 0;
  return Array.from({ length: players }, (_, i) =>
    spySeats.includes(i + 1) ? null : deck[k++ % roleCount]);
}

function encodeRound(r) {
  return b64url.encode([
    r.locationId, r.spySeats.join(','), r.players, r.startSeat, r.nonce,
    r.roles.map((x) => (x === null ? '' : x)).join(','),
  ].join('|'));
}

function decodeRound(hash) {
  const [locationId, seats, players, startSeat, nonce, roles] = b64url.decode(hash).split('|');
  const r = {
    locationId,
    spySeats: String(seats).split(',').map(Number),
    players: +players, startSeat: +startSeat, nonce,
    roles: String(roles).split(',').map((x) => (x === '' ? null : +x)),
  };
  const inSeats = (n) => Number.isInteger(n) && n >= 1 && n <= r.players;
  const ok = locationId && nonce
    && Number.isInteger(r.players) && inSeats(r.startSeat)
    && r.spySeats.length > 0 && r.spySeats.every(inSeats)
    && r.roles.length === r.players
    && r.roles.every((x, i) => (r.spySeats.includes(i + 1) ? x === null : Number.isInteger(x) && x >= 0));
  if (!ok) throw new Error('bad payload');
  return r;
}
