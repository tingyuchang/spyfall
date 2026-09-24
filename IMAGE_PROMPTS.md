# 圖片 Prompt（Kling AI）

## 共用設定

- **比例**：4:3
- **輸出檔名**：用地點的 `id`，例如 `hospital.png`，放到 `images/raw/`（轉檔流程見 `PLAN.md` 第 5 節）
- **風格**：每條 prompt 都已經包含同一段風格描述，可以直接整段貼上，30 張圖的畫風會一致
- **Negative prompt**（每張都用這段）：

```
text, letters, words, signage with readable text, watermark, logo, signature, UI, frame, border, close-up faces, portrait, people in foreground, blurry, low quality, distorted perspective, extra limbs
```

> 為什麼畫面裡不放清楚的人物：圖片只描繪地點，避免畫出特定職業，
> 讓玩家誤以為那就是自己的角色，或洩漏其他人的職業。

---

## 地點（30 個）

### 1. `airplane` 飛機 ✈️
職業：機長、空服員、頭等艙乘客、經濟艙乘客、機械員、空警、帶小孩的家長、睡死的乘客
```
Interior of a modern passenger airplane cabin mid-flight, long aisle with rows of blue seats, overhead bins, oval windows showing clouds at sunset, galley curtain at the far end. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 2. `bank` 銀行 🏦
職業：行員、經理、保全、搶匪、客戶、運鈔員、理財專員、清潔工
```
Grand bank lobby with marble floor, row of teller counters behind glass, a massive round steel vault door slightly open in the back, queue ropes, number-ticket machine. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 3. `beach` 海灘 🏖️
職業：救生員、衝浪手、賣冰小販、攝影師、玩沙的小孩、觀光客、做日光浴的人、海巡
```
Sunny tropical beach with turquoise waves, colorful umbrellas and towels on golden sand, a red lifeguard tower, surfboards stuck in the sand, a small ice-cream cart. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 4. `casino` 賭場 🎰
職業：荷官、保全、賭客、老千、經理、酒保、駐場表演者、輸光的人
```
Glamorous casino floor at night, green felt roulette and card tables, rows of glowing slot machines, stacks of chips, golden chandeliers and red carpet. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 5. `hospital` 醫院 🏥
職業：醫生、護理師、病人、外科醫師、實習醫生、家屬、掛號櫃台、救護車司機
```
Bright hospital corridor with a nurses' station, hospital beds and IV stands, a wheelchair, green exit signs without text, operating room double doors at the end. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 6. `hotel` 飯店 🏨
職業：櫃台人員、門房、房務員、經理、房客、酒保、保全、蜜月夫妻
```
Luxurious hotel lobby with a polished reception desk, brass luggage cart, grand staircase, crystal chandelier, potted palms and a service bell on the counter. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 7. `military_base` 軍營 🪖
職業：班長、新兵、連長、伙房兵、衛哨、軍醫、想逃兵的人、補給士官
```
Military training camp in Taiwan, rows of green barracks, a flagpole in the center of a dusty parade ground, camouflage army trucks, sandbag walls and a watchtower under a hot sky. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 8. `movie_studio` 片場 🎬
職業：導演、演員、替身、攝影師、化妝師、編劇、臨時演員、場務
```
Busy film studio soundstage, a half-built western town set, big studio lights on stands, a camera on a dolly track, director's chair and a clapperboard, cables across the floor. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 9. `pirate_ship` 海盜船 🏴‍☠️
職業：船長、大副、廚子、瞭望手、俘虜、水手、砲手、寶藏獵人
```
Deck of a wooden pirate ship on a stormy sea, tattered black sails, cannons along the rails, a treasure chest spilling gold coins, a crow's nest on the tall mast. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 10. `polar_station` 南極研究站 🧊
職業：研究員、氣象學家、地質學家、隊醫、廚師、探險家、無線電員、紀錄片攝影師
```
Remote Antarctic research station, orange modular buildings on stilts in endless snow, radio antennas and a weather balloon, snowmobiles parked outside, penguins in the distance, aurora in the sky. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 11. `police_station` 警察局 🚓
職業：警察、刑警、嫌犯、報案民眾、律師、記者、分局長、義警
```
Inside a busy police station, cluttered desks with files and old computers, a holding cell with bars, an evidence board with photos connected by red string, police cars visible through the window. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 12. `restaurant` 西餐廳 🍽️
職業：主廚、服務生、客人、美食評論家、洗碗工、經理、外送員、駐唱小提琴手
```
Elegant fine-dining restaurant, white tablecloths with candles and wine glasses, an open kitchen with flames on the stove in the back, a small stage with a violin stand. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 13. `school` 學校 🏫
職業：老師、學生、校長、教官、工友、營養午餐阿姨、家長、轉學生
```
Taiwanese high school classroom, rows of wooden desks and chairs, a green chalkboard with chalk drawings, ceiling fans, windows overlooking a running track and a school building corridor. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 14. `space_station` 太空站 🚀
職業：指揮官、工程師、科學家、隨隊醫生、太空觀光客、外星人、駕駛員、維修員
```
Interior of a futuristic space station module, floating tools and cables, glowing control panels, a large round window showing planet Earth, white padded walls and handrails. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 15. `submarine` 潛水艇 ⚓
職業：艦長、聲納員、魚雷手、廚師、輪機員、導航員、通訊員、水兵
```
Cramped submarine control room lit in red, periscope in the center, glowing green sonar screens, pipes and valves along the walls, round hatch door, bunks visible in the next compartment. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 16. `supermarket` 超市 🛒
職業：收銀員、店長、理貨員、試吃阿姨、顧客、保全、送貨司機、搶特價的婆婆
```
Bright supermarket interior, long aisles of colorful shelves, a fresh fruit and vegetable section in front, shopping carts, checkout counters with conveyor belts, a small free-sample stand. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 17. `theater` 劇院 🎭
職業：演員、導演、觀眾、燈光師、售票員、提詞員、樂手、帶位員
```
Classic theater auditorium seen from the back rows, red velvet seats, grand stage with heavy red curtains half open, spotlights beaming down, ornate gilded balconies. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 18. `high_speed_rail` 高鐵 🚄
職業：列車長、司機員、推車服務員、一般乘客、商務艙乘客、趕車的上班族、背包客、清潔員
```
Interior of a Taiwan high speed rail train car, rows of clean seats with headrest covers, a snack trolley in the aisle, large windows showing green rice fields rushing past in motion blur. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 19. `circus` 馬戲團 🎪
職業：小丑、馴獸師、空中飛人、魔術師、團長、觀眾、雜技演員、賣爆米花的
```
Inside a big top circus tent, red and white striped canvas, a sawdust ring under spotlights, trapezes and a tightrope high above, a lion's pedestal and hoops, popcorn stand at the entrance. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 20. `wedding_banquet` 喜宴 💒
職業：新郎、新娘、伴娘、主持人、總舖師、媒人、喝醉的親戚、婚攝
```
Taiwanese wedding banquet hall, many round tables with red tablecloths and lazy susans, a stage with a heart-shaped balloon arch and screen, red and gold decorations, stacks of dishes being served. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 21. `night_market` 夜市 🏮
職業：攤販老闆、觀光客、約會的情侶、撈金魚老闆、巡邏警察、美食網紅、射氣球攤老闆、排隊的學生
```
Crowded Taiwanese night market street at night, rows of food stalls with steaming woks and grills, red paper lanterns overhead, a goldfish scooping game pool and a balloon dart game booth, warm neon glow. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 22. `temple` 廟宇 🛕
職業：廟公、信徒、乩童、廟方志工、觀光客、求籤的人、陣頭成員、賣香的
```
Colorful traditional Taiwanese temple courtyard, ornate swallowtail roof with dragon sculptures, a large bronze incense burner with rising smoke, red lanterns, fortune stick holders on an altar table. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 23. `convenience_store` 便利商店 🏪
職業：店員、店長、送貨員、買咖啡的上班族、繳費的阿伯、來取貨的人、放學的學生、大夜班工讀生
```
Interior of a Taiwanese convenience store at night, bright fluorescent lights, fridges full of drinks, a hot food counter with tea eggs and steamed buns, a coffee machine, a small seating bar by the window. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 24. `mrt` 捷運車廂 🚇
職業：司機員、通勤族、學生、坐博愛座的阿嬤、觀光客、站務員、睡過站的人、背大背包的人
```
Interior of a Taipei metro train car, long blue side-facing seats, dark blue priority seats, hanging hand straps, stainless steel poles, a route map strip above the doors with no readable text, city lights through the windows. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 25. `ktv` KTV 🎤
職業：麥霸、服務生、壽星、不唱歌的人、點歌狂、櫃台人員、喝醉的人、約會的情侶
```
Private karaoke room in Taiwan, a big screen glowing with a music video, curved leather sofa, low table with microphones, snacks, fruit platter and drinks, disco ball and colorful mood lights. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 26. `hot_spring` 溫泉 ♨️
職業：泡湯客、老闆、按摩師、觀光客、清潔員、賣溫泉蛋的、老夫妻、泡太久頭暈的人
```
Outdoor hot spring in the mountains of Beitou, steaming rock-lined pools, wooden bathhouse with a tiled roof, bamboo fences, towels and wooden buckets, misty green hills behind. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 27. `gym` 健身房 🏋️
職業：私人教練、會員、健美選手、櫃台人員、第一天來的新手、瑜伽老師、業務推銷員、清潔員
```
Modern gym interior, rows of treadmills facing large windows, dumbbell racks and a squat rack with a barbell, full-length mirrors, yoga mats stacked in a corner, industrial lighting. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 28. `zoo` 動物園 🦁
職業：保育員、獸醫、遊客、校外教學的小朋友、導覽員、野生動物攝影師、賣氣球的、園長
```
Lush zoo pathway with an elephant enclosure and a giraffe peeking over the trees, a panda habitat with bamboo, wooden railings, a map board without text, balloons tied to a small kiosk. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 29. `amusement_park` 遊樂園 🎡
職業：遊客、設施操作員、穿玩偶裝的吉祥物、小孩、約會的情侶、攤販、保全、走失的小孩
```
Cheerful amusement park on a sunny day, a giant Ferris wheel and a twisting roller coaster, a carousel with painted horses, cotton candy stand, colorful bunting flags. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

### 30. `department_store` 百貨公司週年慶 🛍️
職業：專櫃小姐、貴婦、保全、樓管、搶優惠的顧客、美食街店員、停車場引導員、被拖來的老公
```
Busy department store during an anniversary sale, glossy cosmetics counters on the ground floor, escalators crisscrossing an atrium, hanging red sale banners without readable text, shopping bags piled up. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, detailed environment, wide establishing shot, no people in the foreground, only tiny distant figures at most.
```

---

## 其他圖片

### `spy` 間諜卡（間諜的身分卡用）
```
A mysterious spy silhouette in a trench coat and fedora standing in a dim alley, face completely hidden in shadow, holding a magnifying glass, dramatic spotlight and fog, dark teal and amber palette. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting.
```

### `hero` 首頁主視覺／分享預覽圖（選用，比例改 16:9）
```
A collage of tiny miniature locations arranged on a board-game table seen from above: an airplane, a casino, a night market, a submarine, a temple and a beach, with a shadowy spy figure peeking from the edge holding a magnifying glass. Stylized digital illustration in a warm, painterly board-game card style, rich colors, soft cinematic lighting, playful mood.
```
