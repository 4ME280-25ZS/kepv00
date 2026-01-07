// Supabase configuration (browser-friendly).
// This file creates a global `supabaseClient` used by the app.
// Values provided by the user for this workspace.

const SUPABASE_URL = 'https://jygafeklljwspknqljza.supabase.co';
const SUPABASE_KEY = 'sb_publishable_CxsAu_XBdYhqbL0J-PkHjA_K74rKkyt';

// `supabase` comes from the UMD bundle loaded in index.html.
// Create and expose the client as `window.supabaseClient` for `db.js` and the app to use.
// NOTE: The key used here is the public/publishable (anon) key — it is safe to include
// in frontend code. Never expose a service_role (secret) key in the browser.
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
