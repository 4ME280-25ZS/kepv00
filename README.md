# Personal Business Card — Static Site

This repository contains a minimal, accessible personal website built with plain HTML, CSS, and a small amount of vanilla JavaScript. It's ready to publish via GitHub Pages from the repository root.

Files
- `index.html` — root page (edit placeholders here: name, role, bio, email, social links).
- `styles.css` — site styles and CSS variables for quick customization.
- `script.js` — small script for smooth scrolling and mobile nav toggle.

Quick start

Open `index.html` directly in a browser, or serve locally for correct URL handling:

```bash
# from the project root
python3 -m http.server 8000
# then visit http://localhost:8000
```

Customizing content
- Edit `index.html` to replace placeholder text:
  - Your name and role in the hero heading
  - The short bio in the About section
  - Email address and social links in the Contact section

Styling
- Edit CSS variables at the top of `styles.css` to change colors, radius, and fonts.

Accessibility
- Semantic HTML is used throughout.
- Focusable controls and skip link are included.
- Respect `prefers-reduced-motion`.

Publishing to GitHub Pages (root)

1. Create a new repository on GitHub and push this project to the repository root (no subfolder required).

```bash
git init
git add .
git commit -m "Initial personal business-card site"
git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

2. In your repository settings on GitHub, under "Pages", choose the branch `main` (or `master`) and the root `/` folder as the source. Save. Your site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPO/` shortly.

Notes
- This project contains no build tools or dependencies; drop-in static site ready for GitHub Pages.
- For a custom font, add a `link` to a webfont in the head of `index.html` and update `--font-sans` in `styles.css`.

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

