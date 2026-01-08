# Personal Business Card

A clean, modern personal website serving as an online business card for Pepa Švenkr, a professional cameraman.

## Features

- Responsive, mobile-first design
- Professional typography-first layout
- Smooth scrolling navigation
- Hero section with image
- About, Skills, and Contact sections
- Fully accessible (semantic HTML, skip links, ARIA)
- No frameworks or build tools
- Fast loading, minimalistic

## Files

- `index.html` — Main page (name, role, bio, skills, contact)
- `styles.css` — Responsive styling with CSS variables
- `script.js` — Smooth scrolling and mobile nav toggle
- `assets/hero.svg` — Placeholder hero image

## Customization

1. **Name & Content**: Edit `index.html` to replace placeholder text
2. **Colors & Fonts**: Adjust CSS variables at the top of `styles.css`
3. **Hero Image**: Replace `assets/hero.svg` with your own photo
4. **Social Links**: Update social URLs in the Contact section

## Running locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000/business-card/
```

## Deployment

This site is designed for GitHub Pages. The root kepv00 project handles hosting both this business card and the wishlist app.
