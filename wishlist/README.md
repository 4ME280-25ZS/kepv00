# Gift Wishlist (simple)

This is a very small, beginner-friendly gift wishlist web app.

- View a list of gifts.
- Reserve a gift by entering your name (uses `prompt`).
- Reservations are stored in the browser via `localStorage` and persist after reload.

Files
- `index.html` — main page
- `style.css` — simple styles
- `script.js` — hardcoded gifts + reservation logic

Run locally
1. Open `wishlist/index.html` in your browser (double-click or use `open` on macOS):

```bash
open wishlist/index.html
# Gift Wishlist (simple)

Small, beginner-friendly wishlist app that displays gifts and allows visitors to reserve them.

Key points
- UI: simple list with Reserve / Cancel functionality (prompt for name).
- Data: stored in Supabase table `gifts` (shared across visitors).
- No backend server required — uses Supabase JS client in the browser.

Files of interest
- `index.html` — main page (relative asset paths)
- `style.css` — styles
- `script.js` — UI rendering and interactions (calls `db.js`)
- `db.js` — small helper for Supabase operations (`fetchGifts`, `reserveGift`, `unreserveGift`)
- `supabase-config.js` — place your `SUPABASE_URL` and publishable key here

Run locally
1. Open `wishlist/index.html` in your browser (or serve the folder with a simple static server):

```bash
# macOS / Linux
python3 -m http.server 8000
open http://localhost:8000/wishlist/index.html

# or on macOS directly
open wishlist/index.html
```

Prepare Supabase
1. In `supabase-config.js` replace the placeholders with your project's URL and publishable (anon) key.
2. Ensure the `gifts` table exists and has columns: `id` (uuid), `title` (text), `description` (text, optional), `reserved_by` (text, nullable).
3. Ensure RLS policies allow the anon key to read and update `reserved_by` (or run the SQL provided in the repo to create policies and seed data).

Deployment (GitHub Pages)
- The project uses relative paths and works as a static site. When ready, push to GitHub and enable Pages for branch `main` → `/root`.

Notes
- `supabase-config.js` intentionally contains the publishable (anon) key — this is safe for frontend use. Do not commit service_role keys to the repo or expose them in the browser.
- Local `localStorage` logic was removed in favor of Supabase as the source of truth.
