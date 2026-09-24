# IQ Level Uz — Firebase bilan ulangan, GitHub'ga joylash qo'llanmasi

## Nima o'zgardi

1. **Firebase Firestore ulandi** (`src/firebase.ts`) — skrinshotdagi haqiqiy
   loyiha konfiguratsiyasi (`iqbot-c1b8c`) bilan.
2. **Real, umumiy statistika** (`src/services/cloud.ts`):
   - `users` — har bir real foydalanuvchining profili (Telegram ID bo'yicha),
     abadiy eslab qolinadi.
   - `duels` — faqat haqiqatan bo'lib o'tgan duellar.
   - `stats/global` — saytdagi umumiy hisoblagichlar
     (`totalUsers`, `totalTestsCompleted`, `totalDuels`, `totalGamesPlayed`).
   Bularning barchasi **yangi Firebase loyihada 0 dan boshlanadi** va faqat
   haqiqiy harakatlardan o'sadi.
3. **Soxta/qattiq yozilgan raqamlar olib tashlandi**: admin paneldagi
   `+18` baza, qattiq yozilgan `"8 kishi"`, va boshlang'ich soxta duel
   ro'yxati (`INITIAL_RECENT_DUELS`).
4. Yangi ro'yxatdan o'tgan foydalanuvchi endi **haqiqatan 0 dan** boshlaydi
   (XP: 0, tanga: 0, darajasi: 1, nishonlar: yo'q).
5. `index.html` ga Telegram WebApp skripti qo'shildi — shu orqali app real
   Telegram foydalanuvchi ID'sini oladi va uni **doim eslab qoladi**
   (qurilma/sessiya almashsa ham).

## 1-qadam: Firestore'ni yoqish

1. https://console.firebase.google.com/project/iqbot-c1b8c → **Firestore Database** → **Create database** (agar hali yaratilmagan bo'lsa) → "Start in production mode".
2. **Rules** bo'limiga o'ting, loyihadagi `firestore.rules` faylining
   matnini nusxalab, **Publish** tugmasini bosing.

## 2-qadam: GitHubga joylash

```bash
git init
git add .
git commit -m "IQ Level Uz - Firebase bilan"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/REPO_NOMI.git
git push -u origin main
```

## 3-qadam: GitHub Pages'ni yoqish

1. Repo → **Settings → Pages**
2. **Source**: "GitHub Actions" ni tanlang (loyihada tayyor
   `.github/workflows/deploy.yml` bor — push qilishning o'zi avtomatik
   build qilib, Pages'ga chiqaradi).
3. Bir necha daqiqadan so'ng sayt manzili shu yerda ko'rinadi:
   `https://SIZNING_USERNAME.github.io/REPO_NOMI/`

## 4-qadam: Telegram botga ulash

BotFather → sizning botingiz → **Bot Settings → Menu Button / Mini App** →
yuqoridagi GitHub Pages URL'ini kiriting.

## Qo'lda build qilish (ixtiyoriy)

```bash
npm install --legacy-peer-deps
npm run build
# tayyor HTML/CSS/JS: dist/ papkasida
```

`dist/` papkasining o'zi — to'liq statik HTML sayt, uni istalgan hostingga
(GitHub Pages, Netlify, Vercel, oddiy hosting) to'g'ridan-to'g'ri
yuklashingiz mumkin.
