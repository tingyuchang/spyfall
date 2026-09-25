# CLAUDE.md

《Spyfall 誰是間諜》繁體中文網頁版。**請用繁體中文跟使用者討論。**

線上版：https://tingyuchang.github.io/spyfall/（repo：`tingyuchang/spyfall`）

架構照搬姊妹專案 `~/git/chameleon`（抓包變色龍），兩邊的慣例保持一致。
原始執行計劃在 `PLAN.md`。

## 核心架構決定：零後端

一局的全部資訊編碼在網址的 `#` 片段，由各自手機**本機**解讀。`#` 不會送到伺服器，
所以身分分發不需要資料庫或連線同步。**不要引入 Firebase、建置工具或框架**，
純 HTML/CSS/原生 JS 直接推 GitHub Pages 是刻意的選擇。

已知取捨（使用者已接受，不用再提）：
- 主持人畫面無法顯示「已加入 4/6 人」，靠口頭確認
- 每局要重新掃一次 QR
- 身分資訊在前端可被解出來：桌遊就是開心就好，不用擔心作弊

## payload 格式與相容性

```
locationId | spySeats | players | startSeat | nonce | roles
hospital     "2,7"      人數      起始玩家    每局亂數  每個座位的職業 index，間諜那格留空
```

範例：`hospital|3|6|1|k3x9qa|4,0,,7,2,5`，轉成 base64url 放在 `#` 之後。
編碼／解碼在 `js/round.js`（純邏輯，不碰 DOM），`tests.html` 開起來就用 `console.assert` 跑自我檢查。

**改動時的鐵律**（違反的話，已發出去的 QR 會解不開或解錯）：

- **不要改欄位順序或新增中間欄位**，新欄位只能加在最後
- **不要更動 `data/locations.json` 既有的 `id`**
- **不要改既有職業的順序、不要刪職業**：`roles` 存的是 index，新職業只能 append
- `spySeats` 單一值（`"3"`）必須繼續能解析，已有測試涵蓋
- 職業是主持人端洗牌後**直接寫進網址**，不用亂數種子推算：洗牌演算法改了也不會影響舊 QR
- `nonce` 讓每局網址不同，玩家手機記住的座位號（`seat:`+nonce）和排除的地點（`x:`+nonce）才會在新局自動重置

改了 `round.js` 就開 `tests.html` 確認全部通過。

## 設定都在 data/locations.json

人數範圍、雙間諜門檻、每局分鐘數、地點和職業全在這個檔案，**調整這些不該需要改程式碼**。
新增功能時優先考慮能不能做成 config 欄位。

```json
"config": { "minPlayers": 3, "maxPlayers": 12, "twoSpiesFrom": 9, "roundMinutes": 8 }
```

每個地點 8 個職業；人數超過職業數時循環重複發（使用者已確認可以接受）。

## 圖片

- 地點圖預設路徑 `images/locations/{id}.jpg`（可用 `image` 欄位覆寫），間諜卡 `images/spy.jpg`，比例 4:3
- 投影牆用縮圖 `images/thumbs/{id}.jpg`（寬 480），身分卡用大圖（寬 1024）。原圖全抓要 5.8MB，投影牆會載很久
- `pic(src, emoji, fallback)`：載入失敗先換 fallback，再失敗就移除 img 露出 emoji，所以**缺圖不會壞版**（缺縮圖 → 大圖 → emoji）
- 預載：主持人開首頁就抓全部縮圖；玩家解完 payload 就抓地點圖**和**間諜圖（兩張都抓，不從流量洩漏身分）
- 原圖放 `images/raw/`（gitignore），用 `sips` 轉大圖和縮圖，指令在 README
- prompt 在 `IMAGE_PROMPTS.md`；畫面裡刻意不放清楚的人物，避免洩漏或誤導職業
- 職業不產圖（30 × 8 張成本太高），身分卡用文字

## 玩家身分卡：按住才顯示

- 蓋卡對平民和間諜**長得一模一樣、高度也一樣**，旁人不能從外觀看出身分。改版型時別破壞這點
- 放開、`pointercancel`、視窗 `blur`、`visibilitychange` 都會蓋回去
- `.reveal` 上的 `-webkit-touch-callout:none`、`user-select:none`、`touch-action:none` 是擋 iOS 長按選單和選字，別拿掉

## 投影模式

`show()` 會把目前畫面名稱寫進 `body[data-screen]`，CSS 據此換版型。
只有主持人的 `board` 畫面解除 560px 寬度限制，其他畫面維持手機版型。

地點圖片牆**必須一個畫面放得下、不能捲動**：`fitBoardWall()` 由少到多試欄數，
挑放得下全部地點的最大格子，每格固定 4:3（名稱疊在圖片下緣，不另外佔高度）。
視窗 resize／全螢幕時會重算。地點數量變多也會自動縮小。

倒數計時每次用 `Date.now()` 重算剩餘時間，離開 `board` 畫面會自動停止。

## 雙間諜的資訊設計

兩個間諜**互相不知道對方是誰**，但**所有人都被告知本局有幾個**，
不講的話投票邏輯會壞（大家投完一個就以為結束）。改動時別拿掉這個提示。

## 部署

GitHub Pages 直接服務 `main` 的根目錄，沒有 CI，push 後約一分鐘生效。

⚠️ 這台機器的 `gh` CLI 預設帳號是 **dwr-matt**。
需要用 `gh` 操作本 repo 時先 `gh auth switch --user tingyuchang`，**用完切回去**。
（`git push` 走 SSH，不受影響。）

## 用 headless Chrome 驗證畫面

複製 `index.html` 成暫存檔 `_probe.html`、附加一段自動點擊的 script，再用 Chrome 截圖：

```bash
python3 -m http.server 8000 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1920,1080 --virtual-time-budget=5000 \
  --screenshot=out.png http://localhost:8000/_probe.html
```

- 要測玩家畫面：在載入 `js/round.js` 之後插一段 script，用 `history.replaceState` 設好 `#payload`，
  並先寫入 `localStorage['seat:'+nonce]`，就會直接進到身分卡
- 按住顯示可以用 `dispatchEvent(new PointerEvent('pointerdown', {bubbles:true}))` 模擬
- 要讀數值就把結果寫進 `document.title` 再用 `--dump-dom` 抓出來

**坑**：headless Chrome 的 viewport 最小寬度是 **500px**。指定 `--window-size=390`
會得到一張 390px 寬、但內容其實是 500px 版面的裁切圖，看起來像版面爆掉，那是假象。

暫存的 `_*.html` 記得刪掉，不要 commit（已在 `.gitignore`）。
