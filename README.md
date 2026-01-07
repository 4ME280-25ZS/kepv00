# Pepa Švenkr — Portfolio & Wishlist

This repository contains two projects:

1. **Gift Wishlist** (root) — A live, public gift wishlist with Firebase Firestore integration
2. **Business Card** (subfolder) — A personal business card website

## Project Structure

```
kepv00/
├── index.html              # Wishlist app (main page)
├── styles.css              # Wishlist styles
├── script.js               # Wishlist logic
├── firebase-config.js      # Firebase configuration (you fill in)
├── README.md               # This file
└── business-card/          # Personal business card
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── README.md
    └── assets/
        └── hero.svg
```

## Gift Wishlist (Root)

### Features
- View gifts with descriptions, prices, and links
- Reserve gifts by entering your name
- Cancel reservations (name verification)
- Real-time updates across all visitors via Firebase Firestore
- Responsive mobile-first design
- Fully accessible

### Setup

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com)
2. **Enable Firestore Database** (test mode)
3. **Get your config keys** from Project Settings → Web app
4. **Fill in `firebase-config.js`** with your Firebase credentials
5. **Create a Firestore collection** named `gifts` with sample documents:
   ```json
   {
     "title": "PlayStation 5",
     "description": "Latest gaming console",
     "url": "https://example.com",
     "price": "$499",
     "reservedBy": null,
     "reservedAt": null
   }
   ```

### Running locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000/
```

## Business Card (Subfolder)

A professional business card for Pepa Švenkr, a professional cameraman.

### Features
- Clean, modern design
- Responsive layout
- Hero section with image
- About, Skills, and Contact sections
- Smooth navigation
- Fully accessible

### Running locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000/business-card/
```

See [business-card/README.md](business-card/README.md) for more details.

## Deployment to GitHub Pages

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. In GitHub Settings → Pages:
   - Select `main` branch
   - Select `/` (root) folder
   - Save

3. Your site will be live at:
   - Wishlist: `https://username.github.io/kepv00/`
   - Business Card: `https://username.github.io/kepv00/business-card/`

## Notes

- **Firestore Security**: Before sharing widely, update Firestore rules to restrict access
- **No Build Tools**: Both projects use pure HTML/CSS/JavaScript + Firebase SDK
- **Mobile-First**: Fully responsive on all devices
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## Files to Customize

- `index.html` (root) — Header, footer, modal text
- `firebase-config.js` — Your Firebase credentials
- `business-card/index.html` — Name, bio, skills, contact details
- `business-card/assets/hero.svg` — Replace with your photo

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6 support required.
## Publikace na GitHub Pages

Krátký návod, jak publikovat tento repozitář pomocí GitHub Pages:

1. Otevřete repozitář na GitHubu a přejděte do **Repository → Settings → Pages**.
2. V sekci **Build and deployment** vyberte **Deploy from a branch**.
3. Jako **Branch** zvolte `main` a jako **Folder** zvolte `/ (root)`.
4. Uložte nastavení. Nasazení může trvat několik minut; konečná URL se zobrazí v téže sekci Pages, obvykle ve tvaru `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

Poznámky o připravenosti k nasazení:
- `index.html` je umístěný v kořeni repozitáře, takže není potřeba žádný build krok.
- Všechny cesty k assetům v projektu jsou relativní (např. `assets/hero.svg`).
- Není potřeba žádný build nástroj ani závislosti — stačí nasadit z větve `main`.

