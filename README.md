# 🕵️ 誰是間諜（Spyfall）

派對桌遊《Spyfall》的繁體中文網頁版。**純靜態網頁、零後端**，可直接部署在 GitHub Pages。

## 怎麼玩

**主持人（一支手機／平板／接投影的筆電）**

1. 開新遊戲 → 選人數（預設 3–12）；9 人以上可再選 1 個還是 2 個間諜
2. 按「生成身份」→ 畫面出現一張 QR Code
3. 其他人用手機相機掃 QR，各自點選座位號
4. 大家都掃完 → 按「開始遊戲」→ 畫面顯示**全部地點的圖片牆**和 **8 分鐘倒數**
5. 一局結束按「下一局」，會產生新的 QR（大家重掃一次）

**玩家**

- 身分卡預設蓋住，**按住才顯示**，放開就蓋回去
- **平民**：看到地點圖片、地點名和自己的職業（例如「醫院 · 實習醫生」）
- **間諜**：不知道地點，要從大家的問答推測
- 「查看所有地點」可以把不可能的地點點成灰色排除，只存在自己手機上

輪流指定一個人問一個問題 → 時間到或有人喊停就投票指認間諜。
間諜可以隨時亮身分猜地點，猜對就算間諜贏。

2 個間諜時，兩人互相不知道對方是誰，其他人也只被告知「本局有 2 個間諜」。

## 為什麼不用後端

一局的全部資訊（地點、間諜座位、人數、起始玩家、每個座位的職業）編碼在網址的 `#` 片段裡。
`#` 之後的內容**不會送到伺服器**，只在各自手機上解讀，所以不需要資料庫，也不需要連線同步。

代價：主持人畫面無法顯示「已加入 4/6 人」，口頭確認即可。

## 擴充地點／調整設定

全部在 `data/locations.json`，改完不用動程式碼。

```json
"config": {
  "minPlayers": 3,
  "maxPlayers": 12,
  "twoSpiesFrom": 9,     // 幾人以上才出現「2 個間諜」選項
  "roundMinutes": 8      // 每局倒數幾分鐘
}
```

新增地點：

```json
{ "id": "your_id", "name": "地點名稱", "emoji": "🎯",
  "roles": ["職業1", "職業2", "...建議 8 個..."] }
```

- 圖片放 `images/locations/{id}.jpg`（4:3），沒放圖就顯示 emoji
- 人數比職業多時，職業會重複發
- ⚠️ **不要改既有的 `id`，也不要改既有職業的順序或刪職業**，否則已發出的 QR 會解錯。新職業只能加在最後面

## 圖片

prompt 在 `IMAGE_PROMPTS.md`。產好的原圖用 `id` 命名放進 `images/raw/`（不 commit），再用 macOS 內建的 `sips` 縮圖：

```bash
mkdir -p images/locations
for f in images/raw/*.png; do
  sips -s format jpeg -s formatOptions 75 --resampleWidth 1024 "$f" \
    --out "images/locations/$(basename "${f%.*}").jpg"
done
```

間諜卡圖是 `images/spy.jpg`，用同樣方式處理。

## 本機測試

```bash
python3 -m http.server 8000
# 開 http://localhost:8000
# payload 自我檢查：http://localhost:8000/tests.html
```

> 手機要掃得到 QR，網站必須部署在手機連得到的網址（GitHub Pages 或同網段的電腦 IP）。
> 直接用 `file://` 開啟會無法載入地點資料。

## 部署到 GitHub Pages

Settings → Pages → Source 選 `main` 分支的 `/ (root)`，推上去就好，不需要建置流程。

## 檔案結構

```
index.html          所有畫面
tests.html          payload 自我檢查（開起來就跑）
css/style.css       樣式（深色、手機直式優先，投影畫面滿版）
js/round.js         一局的編碼／解碼、職業分配（純邏輯）
js/app.js           畫面、計時器、事件
js/qrcode.min.js    QR 產生器（qrcodejs 1.0.0，已內含）
data/locations.json 地點、職業、設定
images/locations/   地點圖片（{id}.jpg）
IMAGE_PROMPTS.md    產圖用的 prompt
```
