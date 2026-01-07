<<<<<<< HEAD
=======
# Personal Business Card — Static Site

This repository contains a minimal, accessible personal website built with plain HTML, CSS, and a small amount of vanilla JavaScript. It's ready to publish via GitHub Pages from the repository root.

Files
- `business-card/index.html` — personal business card (edit placeholders here: name, role, bio, email, social links).
- `business-card/styles.css` — site styles and CSS variables for quick customization.
- `business-card/script.js` — small script for smooth scrolling and mobile nav toggle.

Quick start

Open `business-card/index.html` directly in a browser, or serve locally for correct URL handling:

```bash
# from the project root
python3 -m http.server 8000
# then visit http://localhost:8000/business-card/
```

Customizing content
- Edit `business-card/index.html` to replace placeholder text:
  - Your name and role in the hero heading
  - The short bio in the About section
  - Email address and social links in the Contact section

Styling
- Edit CSS variables at the top of `business-card/styles.css` to change colors, radius, and fonts.

Accessibility
- Semantic HTML is used throughout.
- Focusable controls and skip link are included.
- Respect `prefers-reduced-motion`.

Publishing to GitHub Pages (business-card)

1. Create a new repository on GitHub and push this project to the repository root (no subfolder required).

```bash
git init
git add .
git commit -m "Initial personal business-card site"
git remote add origin git@github.com:YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

2. In your repository settings on GitHub, under "Pages", choose the branch `main` (or `master`) and the folder `/business-card` as the source. Save. Your site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPO/business-card/` shortly.

Notes
- This project contains no build tools or dependencies; drop-in static site ready for GitHub Pages.
- For a custom font, add a `link` to a webfont in the head of `business-card/index.html` and update `--font-sans` in `business-card/styles.css`.
   ```

