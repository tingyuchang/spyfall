# 🕵️ 誰是間諜（Spyfall 繁中網頁版）— 執行計劃

參考 `~/git/chameleon`（抓包變色龍）的架構：**純 HTML/CSS/原生 JS、零後端、GitHub Pages**。
身分用 QR 發：一局的資料全放在網址的 `#` 片段，每支手機自己解讀，不需要伺服器。

---

## 0. 遊戲規則（要做成什麼）

- 每局從地點牌中抽一個**地點**。
- **平民**知道地點，也會拿到一個**職業**（例如「醫院 · 外科醫師」）。
- **間諜**不知道地點，只看得到**全部地點的清單**。
- 大家輪流互相問問題，時間到（預設 8 分鐘）或有人喊停時投票指認間諜。
- 間諜可以隨時亮身分猜地點，猜對就算間諜贏。
- 網站只負責發身分、公佈地點清單和計時；投票與勝負靠口頭。

## 1. 跟 chameleon 相比，哪些照搬、哪些改

| 項目 | chameleon | spyfall |
|---|---|---|
| 架構 | 零後端，資料放在 `#`，用 QR 發 | **照搬** |
| 畫面切換 | `show()` 加上 `body[data-screen]` | **照搬** |
| 座位記憶 | `localStorage['seat:'+nonce]` | **照搬** |
| 設定與題庫 | `data/topics.json` | 改成 `data/locations.json` |
| 主持人題目畫面 | 4×4 詞表 | **全部地點的圖片牆** + **倒數計時** |
| 平民身分卡 | 座標 `B3` | **地點圖片 + 地點名 + 職業** |
| 特殊角色身分卡 | 變色龍，只知道主題 | 間諜，只看到地點清單 |
| 雙特殊角色 | 9 人以上可選 2 隻 | 9 人以上可選 2 個間諜（互不知道對方，**但所有人都知道有幾個**） |

可以直接從 chameleon 複製的程式：`b64url`、`show()`、`readSeat/writeSeat`、`renderSeatPicker`、
事件分派（`data-go` / `data-seat` …）、`toggleFullscreen`、投影模式的 CSS、`js/qrcode.min.js`。

## 2. payload 格式（**一開始就定死**）

```
locationId | spySeats | players | startSeat | nonce | roles
hospital     "2" 或 "2,7"  人數     起始玩家    每局亂數  每個座位的職業 index，逗號分隔
```

範例：`hospital|3|6|1|k3x9qa|4,0,,7,2,5`（第 3 位是間諜，所以那格是空的）

- 轉成 base64url 後接在 `#` 後面。
- **每個座位的職業直接寫進網址，不用亂數種子推算**。種子推算雖然讓網址短一點，但只要洗牌演算法一改，舊 QR 就會全部解錯。
- 規則和 chameleon 一樣：上線後**不改欄位順序、不在中間插欄位、不改既有地點的 `id`**。
- `spySeats` 一開始就用逗號分隔，所以單一值（`"3"`）天生就能解析。

**職業分配**：同一個地點的職業先洗牌，再依序發給非間諜座位。人數超過職業數時從頭循環（同一局可能有兩個「護理師」）。
`// ponytail: 職業數不夠時循環重複；想完全不重複就把每個地點補到 maxPlayers-1 個職業`

## 3. `data/locations.json`

```json
{
  "version": 1,
  "config": {
    "minPlayers": 3,
    "maxPlayers": 12,
    "twoSpiesFrom": 9,
    "roundMinutes": 8
  },
  "locations": [
    {
      "id": "hospital",
      "name": "醫院",
      "emoji": "🏥",
      "image": "images/locations/hospital.jpg",
      "roles": ["醫生", "護理師", "病人", "外科醫師", "實習醫生", "家屬", "掛號櫃台", "救護車司機"]
    }
  ]
}
```

- 全部 30 個地點和各自的 8 個職業都寫在 `IMAGE_PROMPTS.md`，裡面的 `id` 和中文名稱直接搬進來即可。
- 圖片路徑可以不寫，預設用 `images/locations/{id}.jpg`。
- 圖片還沒產出前，畫面先顯示 emoji 當替代，所以**程式和圖片可以同時進行**（`<img onerror>` 時改顯示 emoji）。

## 4. 畫面

**主持人**
1. `home`：開新遊戲 / 遊戲規則
2. `setup`：選人數（3–12）、間諜人數（9 人以上才出現）、地點範圍（全部或隨機；第一版不做「自選地點包」）
3. `qr`：QR code 和「大家都掃完了，開始」按鈕
4. `board`（投影模式）：
   - 上方是**倒數計時**（`roundMinutes`），加暫停和重來按鈕；時間到就震動並讓畫面閃一下
   - 中間是**全部地點的圖片牆**，每張圖下方有名稱，版面用 `grid auto-fill` 隨螢幕縮放
   - 下方寫「由 N 號玩家先發問」，有 2 個間諜時加上「本局有 2 個間諜」
   - 按鈕：下一局 / 全螢幕 / 結束

**玩家**
1. `seat`：選座位號
2. `role`：
   - 平民：**地點大圖**、地點名、職業、使用提示
   - 間諜：🕵️ 間諜卡圖、「你不知道地點」、2 個間諜時提示「還有另一個間諜，你不知道是誰」
   - 身分預設蓋住，要**按住才顯示**，放開就蓋回去，避免手機放桌上被旁邊的人看到（chameleon 沒有這個，spyfall 身分比較敏感，值得加）
3. `locations`：全部地點清單，**點一下變灰表示排除**。這是間諜的筆記工具，平民也能用。排除狀態只存在本機、跟著這一局（key 用 `nonce`）
4. `error`

## 5. 圖片產生與處理流程

1. 用 `IMAGE_PROMPTS.md` 的 prompt 在 Kling AI 產圖。比例用 **4:3**，負面提示詞統一使用文件開頭那一段。
2. 挑好的圖，**檔名用地點 `id`**（例如 `hospital.png`），放進 `images/raw/`。這個資料夾不 commit，寫進 `.gitignore`。
3. 用 macOS 內建的 `sips` 縮成寬 1024px 的 JPEG，不需要另外安裝工具：
   ```bash
   mkdir -p images/locations
   for f in images/raw/*.png; do
     sips -s format jpeg -s formatOptions 75 --resampleWidth 1024 "$f" \
       --out "images/locations/$(basename "${f%.*}").jpg"
   done
   ```
   每張約 100–200KB，30 張總共不到 6MB。GitHub Pages 撐得住，手機第一次載入也可以接受。
4. 間諜卡圖 `images/spy.jpg` 用同樣方式處理。

## 6. 執行步驟

- [x] **Step 1 建立 repo**：`git init`，放 `.nojekyll`、`.gitignore`（`images/raw/`、`_*.html`），從 chameleon 複製 `js/qrcode.min.js`
- [x] **Step 2 資料**：把 `IMAGE_PROMPTS.md` 的 30 個地點和職業轉成 `data/locations.json`
- [x] **Step 3 骨架**：從 chameleon 複製 `index.html`、`app.js`、`style.css`，刪掉 4×4 詞表相關程式，把「變色龍」改成「間諜」
- [x] **Step 4 payload**：寫 `encodeRound/decodeRound`，加上 `roles` 欄位，並補上**自我檢查**（見第 7 節）
- [ ] **Step 5 玩家畫面**：身分卡（地點大圖 + 職業 / 間諜卡）、按住才顯示、地點清單（可點選排除）
- [ ] **Step 6 主持人投影畫面**：地點圖片牆和倒數計時
- [ ] **Step 7 圖片**：產圖、用 `sips` 轉檔、放進 `images/locations/`
- [ ] **Step 8 驗證**：用 headless Chrome 截圖（第 7 節），再用真手機掃 QR 走完一局
- [ ] **Step 9 文件**：`README.md`（玩法、擴充地點的方法）、`CLAUDE.md`（架構決定和 payload 鐵律，比照 chameleon）
- [ ] **Step 10 部署**：到 GitHub 建 repo，Settings → Pages → `main` 的 `/ (root)`
  （如果要用 `gh`，記得先 `gh auth switch --user tingyuchang`，用完切回去）

## 7. 驗證

- **payload 自我檢查**：`tests.html` 開起來就用 `console.assert` 跑下列檢查，不用任何測試框架：
  - 編碼後再解碼，資料要一模一樣
  - 單一間諜 `"3"` 和兩個間諜 `"2,7"` 都能解析
  - 間諜座位的職業欄是空的
  - 人數大於職業數時，職業會循環重複
  - 格式壞掉的 payload 要丟出錯誤
- **畫面**：照 chameleon CLAUDE.md 的方法用 headless Chrome 截圖。注意 viewport 最小寬度是 500px，要量實際寬度就用 `document.title` 搭配 `--dump-dom`
- **投影**：分別用 1920×1080 和 1280×720 截圖，確認 30 張圖加上計時器可以擠進一個畫面，不需要捲動
- **真機**：iPhone Safari 和 Android Chrome 各掃一次，確認網址太長時 QR 還掃得出來

## 8. 先做的預設決定（不同意再改）

- 地點數量：**30 個**（原版 Spyfall 1 也是 30 個），原版經典地點和台灣在地地點混合
- 職業：**每個地點 8 個**，人數多時循環重複
- **職業不另外產圖**：30 個地點 × 8 個職業 = 240 張，成本太高，身分卡用文字就夠
- 人數：3–12 人；9 人以上可選 2 個間諜；每局 8 分鐘。這些都能在 config 改
- 圖片比例：**4:3**，手機身分卡和投影圖片牆都放得下
- 不做：計分、多語系、自訂地點包（之後可以加 config 欄位）
