# TODO

完整計劃見 `PLAN.md`，架構與鐵律見 `CLAUDE.md`。

## 目前進度（2026-09-25）

- [x] Step 1–6：repo、地點資料、骨架、payload + `tests.html`、玩家畫面、投影畫面
- [x] Step 9：`README.md`、`CLAUDE.md`
- [ ] Step 10 部署（建議先做：缺圖時會顯示 emoji，不影響遊玩）
- [ ] Step 8 真機驗證（部署後才能用手機掃）
- [x] Step 7 圖片

## 換電腦注意

- **這個 repo 還沒有 remote**：先在原電腦完成 Step 10 推上 GitHub，新電腦再 `git clone`；或直接把整個資料夾（含 `.git`）複製過去
- `images/raw/` 不會進 git，原圖要另外搬
- 新電腦若不是 macOS 就沒有 `sips`，改用 ImageMagick：
  `magick in.png -resize 1024x -quality 75 out.jpg`
- headless Chrome 驗證需要裝 Google Chrome（路徑見 `CLAUDE.md`）
- `CLAUDE.md` 裡的「`gh` 預設帳號是 dwr-matt」是原電腦的狀況，新電腦先 `gh auth status` 確認

## Step 10 部署

- [ ] GitHub 建 repo（例如 `tingyuchang/spyfall`）
  - 原電腦用 `gh` 的話先 `gh auth switch --user tingyuchang`，用完切回去
- [ ] `git remote add origin git@github.com:tingyuchang/spyfall.git && git push -u origin main`
- [ ] Settings → Pages → Source：`main` 分支 `/ (root)`
- [ ] 開 `https://tingyuchang.github.io/spyfall/tests.html` 確認全部通過
- [ ] 把線上網址補進 `README.md` 和 `CLAUDE.md` 開頭

## Step 8 驗證

- [ ] iPhone Safari 掃 QR 走完一局
- [ ] Android Chrome 掃 QR 走完一局
- [ ] 12 人、2 個間諜（網址最長，約 90 字元）的 QR 掃得出來
- [ ] 按住顯示：放開會蓋回、長按不跳選單、不會選到字
- [ ] 地點清單點選排除，重新整理後還在；下一局會清空
- [ ] 選錯座位 →「我選錯號碼了」可以重選
- [ ] 投影：接筆電／投影機按全螢幕，30 格不用捲動、字看得清楚
- [ ] 倒數時間到會閃紅
- [x] 放圖之後再截一次 1920×1080、1280×720（方法見 `CLAUDE.md`）

## Step 7 圖片

prompt 在 `IMAGE_PROMPTS.md`（Kling AI，比例 4:3，負面提示詞用文件開頭那段）。
產好後用 `id` 命名放進 `images/raw/`，再照 `README.md` 的 `sips` 指令轉成 `images/locations/{id}.jpg`。

- [x] `airplane` 飛機
- [x] `bank` 銀行
- [x] `beach` 海灘
- [x] `casino` 賭場
- [x] `hospital` 醫院
- [x] `hotel` 飯店
- [x] `military_base` 軍營
- [x] `movie_studio` 片場
- [x] `pirate_ship` 海盜船
- [x] `polar_station` 南極研究站
- [x] `police_station` 警察局
- [x] `restaurant` 西餐廳
- [x] `school` 學校
- [x] `space_station` 太空站
- [x] `submarine` 潛水艇
- [x] `supermarket` 超市
- [x] `theater` 劇院
- [x] `high_speed_rail` 高鐵
- [x] `circus` 馬戲團
- [x] `wedding_banquet` 喜宴
- [x] `night_market` 夜市
- [x] `temple` 廟宇
- [x] `convenience_store` 便利商店
- [x] `mrt` 捷運車廂
- [x] `ktv` KTV
- [x] `hot_spring` 溫泉
- [x] `gym` 健身房
- [x] `zoo` 動物園
- [x] `amusement_park` 遊樂園
- [x] `department_store` 百貨公司週年慶
- [x] `spy` 間諜卡 → 轉成 `images/spy.jpg`（不是放在 `locations/`）
- [x] 全部轉完確認 `du -sh images/locations` 約 6MB 以內，commit

## 之後可以考慮（不急）

- 首頁主視覺 `hero`（`IMAGE_PROMPTS.md` 有 prompt）＋ `og:image` 分享預覽，目前程式沒有用到
- 投影圖片牆每格固定 4:3，上下會有空白；想讓圖更大可以改成允許裁切填滿
- 不做：計分、多語系、自訂地點包（`PLAN.md` 第 8 節）
